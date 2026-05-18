import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, X, Trash2, CheckCircle, ExternalLink, BellOff } from 'lucide-react';
import { notificationService, AppNotification } from '../services/notificationService';

export const NotificationCenter: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [notifications, setNotifications] = React.useState<AppNotification[]>([]);
  const [permission, setPermission] = React.useState<NotificationPermission>('default');

  React.useEffect(() => {
    setNotifications(notificationService.getNotifications());
    const unsubscribe = notificationService.subscribe(setNotifications);
    
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }

    return unsubscribe;
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleRequestPermission = async () => {
    const res = await notificationService.requestPermission();
    setPermission(res);
    if (res === 'granted') {
      notificationService.sendNotification(
        'Notificações Ativadas! 🚀',
        'Você agora receberá alertas sobre novas dicas e atualizações de renda extra.'
      );
    }
  };

  return (
    <div className="relative">
      {/* Bell Icon */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-3 bg-white/10 hover:bg-white/20 dark:bg-white/5 dark:hover:bg-white/10 text-white rounded-2xl transition-all active:scale-90"
      >
        <Bell className="w-5 h-5 text-white" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-black flex items-center justify-center rounded-full border-2 border-slate-900 dark:border-slate-800 group-hover:scale-110 transition-transform">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 mt-4 w-[350px] max-w-[calc(100vw-2rem)] bg-slate-900 dark:bg-slate-950 border border-white/10 rounded-[32px] shadow-2xl z-50 overflow-hidden"
            >
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <div>
                  <h3 className="text-white font-black italic text-lg">Notificações</h3>
                  <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Central de Alertas</p>
                </div>
                <div className="flex gap-2">
                  {notifications.length > 0 && (
                    <button 
                      onClick={() => notificationService.markAllAsRead()}
                      className="p-2 text-slate-400 hover:text-white transition-colors"
                      title="Marcar todas como lidas"
                    >
                      <CheckCircle className="w-4 h-4" />
                    </button>
                  )}
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-slate-400 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="max-h-[400px] overflow-y-auto no-scrollbar">
                {permission !== 'granted' && (
                  <div className="p-6 bg-blue-600/10 border-b border-blue-500/20">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-600 rounded-2xl">
                        <BellOff className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <p className="text-sm text-white font-bold leading-tight">
                          Ative as notificações para não perder nada!
                        </p>
                        <button 
                          onClick={handleRequestPermission}
                          className="px-4 py-2 bg-blue-600 text-white text-xs font-black rounded-xl hover:bg-blue-500 transition-colors uppercase tracking-widest"
                        >
                          Ativar Agora
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {notifications.length === 0 ? (
                  <div className="p-12 text-center space-y-4">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto">
                      <Bell className="w-8 h-8 text-slate-600 dark:text-slate-500" />
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 font-bold text-sm">Você está em dia! Nenhuma nova notificação.</p>
                  </div>
                ) : (
                  <div className="divide-y divide-white/5">
                    {notifications.map((notif) => (
                      <div 
                        key={notif.id}
                        className={`p-5 flex items-start gap-4 group transition-colors hover:bg-white/5 ${!notif.read ? 'bg-blue-600/5' : ''}`}
                      >
                        <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${!notif.read ? 'bg-blue-500 shadow-sm shadow-blue-500/50' : 'bg-transparent'}`} />
                        <div className="flex-1 min-w-0 space-y-1">
                          <h4 className="text-white font-bold text-sm leading-tight pr-8">{notif.title}</h4>
                          <p className="text-slate-400 text-xs leading-normal">{notif.body}</p>
                          <p className="text-[10px] text-slate-600 font-bold uppercase tracking-tight">
                            {new Date(notif.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                        <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => notificationService.deleteNotification(notif.id)}
                            className="p-2 text-slate-600 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          {notif.link && (
                            <button 
                              onClick={() => window.open(notif.link, '_blank')}
                              className="p-2 text-slate-600 hover:text-blue-400 transition-colors"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {notifications.length > 0 && (
                <div className="p-4 bg-white/5 flex justify-center">
                  <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest">
                    Pressione para ver mais detalhes
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
