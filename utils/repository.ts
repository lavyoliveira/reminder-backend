import admin from 'firebase-admin';
import dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

if (!process.env.PROJECT_ID || !process.env.PRIVATE_KEY || !process.env.CLIENT_EMAIL) {
  throw new Error('As variáveis de ambiente necessárias não foram definidas corretamente.');
}

const serviceAccount = {
  type: 'service_account',
  project_id: process.env.PROJECT_ID,
  private_key_id: process.env.PRIVATE_KEY_ID!,
  private_key: (process.env.PRIVATE_KEY as string).replace(/\\n/g, '\n'),
  client_email: process.env.CLIENT_EMAIL!,
  client_id: process.env.CLIENT_ID!,
  auth_uri: process.env.AUTH_URI!,
  token_uri: process.env.TOKEN_URI!,
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL!,
  client_x509_cert_url: process.env.CLIENT_X509_CERT_URL!,
} as admin.ServiceAccount;

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${process.env.PROJECT_ID}.firebaseio.com`,
  });
} catch (error) {
  console.error('Erro ao inicializar o Firebase:', error);
  process.exit(1);
}

export default admin.firestore();