import * as admin from 'firebase-admin';

// Đảm bảo chỉ khởi tạo một lần
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FB_ADMIN_PROJECT_ID,
      clientEmail: process.env.FB_ADMIN_CLIENT_EMAIL,
      privateKey: process.env.FB_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'), // Private key từ file JSON
    }),
  })
}

export const adminAuth = admin.auth()