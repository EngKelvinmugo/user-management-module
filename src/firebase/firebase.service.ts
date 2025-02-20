import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FirebaseService implements OnModuleInit {
  private db: FirebaseFirestore.Firestore;
  private readonly logger = new Logger(FirebaseService.name);

  onModuleInit() {
    try {
      const serviceAccountPath = path.join(__dirname, '../../firebase-service-account.json');

      if (!fs.existsSync(serviceAccountPath)) {
        throw new Error(`Firebase credentials file not found at ${serviceAccountPath}`);
      }

      const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

      if (!admin.apps.length) {
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
        });
        this.logger.log('Firebase Admin SDK initialized successfully.');
      }

      this.db = admin.firestore();
      this.logger.log('Firestore database connection established.');
    } catch (error) {
      this.logger.error('Firebase initialization error:', error);
      throw error;
    }
  }

  getDb(): FirebaseFirestore.Firestore {
    return this.db;
  }
}
