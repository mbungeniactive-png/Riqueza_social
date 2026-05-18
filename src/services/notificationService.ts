export interface AppNotification {
  id: string;
  title: string;
  body: string;
  timestamp: number;
  read: boolean;
  link?: string;
}

class NotificationService {
  private static instance: NotificationService;
  private notifications: AppNotification[] = [];
  private listeners: ((notifications: AppNotification[]) => void)[] = [];

  private constructor() {
    const saved = localStorage.getItem('app_notifications');
    if (saved) {
      try {
        this.notifications = JSON.parse(saved);
      } catch (e) {
        this.notifications = [];
      }
    }
  }

  public static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  public async requestPermission(): Promise<NotificationPermission> {
    if (!('Notification' in window)) {
      console.warn('Este navegador não suporta notificações desktop');
      return 'denied';
    }
    return await Notification.requestPermission();
  }

  public async sendNotification(title: string, body: string, link?: string) {
    const notification: AppNotification = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      body,
      timestamp: Date.now(),
      read: false,
      link
    };

    this.notifications = [notification, ...this.notifications].slice(0, 50);
    this.save();
    this.notifyListeners();

    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, {
        body,
        icon: '/favicon.ico' // Assuming a default icon
      });
    }
  }

  public getNotifications(): AppNotification[] {
    return this.notifications;
  }

  public markAsRead(id: string) {
    this.notifications = this.notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    );
    this.save();
    this.notifyListeners();
  }

  public markAllAsRead() {
    this.notifications = this.notifications.map(n => ({ ...n, read: true }));
    this.save();
    this.notifyListeners();
  }

  public deleteNotification(id: string) {
    this.notifications = this.notifications.filter(n => n.id !== id);
    this.save();
    this.notifyListeners();
  }

  public subscribe(listener: (notifications: AppNotification[]) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private save() {
    localStorage.setItem('app_notifications', JSON.stringify(this.notifications));
  }

  private notifyListeners() {
    this.listeners.forEach(l => l(this.notifications));
  }
}

export const notificationService = NotificationService.getInstance();
