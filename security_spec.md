# Security Specification for MoneyNet

## Data Invariants
- A user can only access and modify their own profile document.
- Profiles must have a valid UID matching the Auth UID.
- Timestamps must be validated using server time.

## The Dirty Dozen Payloads
1. Create profile with wrong UID.
2. Update another user's profile.
3. Inject excessive data into displayName.
4. Set future createdAt timestamp.
5. Create profile without required fields.
6. Use invalid country code (e.g. 100 characters).
7. Spoof email_verified status.
8. Delete another user's profile.
9. List all users.
10. Update updatedAt with client-side clock.
11. Inject malicious document ID.
12. Attempt to read PII (email) of another user.

## Test Runner Logic
The tests in `firestore.rules.test.ts` will verify that all these malicious attempts return `PERMISSION_DENIED`.
