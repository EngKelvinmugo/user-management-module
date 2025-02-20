import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private collection = 'users';

  constructor(private firebaseService: FirebaseService) {}

  async createUser(createUserDto: CreateUserDto) {
    const db = this.firebaseService.getDb();
    const existingUser = await db.collection(this.collection).where('email', '==', createUserDto.email).get();

    if (!existingUser.empty) {
      throw new BadRequestException('Email already in use');
    }

    const docRef = db.collection(this.collection).doc();
    await docRef.set(createUserDto);
    return { id: docRef.id, ...createUserDto };
  }

  async getUsers(limit: number = 10, cursor?: string) {
    let query = this.firebaseService.getDb().collection(this.collection).orderBy('createdAt').limit(limit);

    if (cursor) {
      const snapshot = await this.firebaseService.getDb().collection(this.collection).doc(cursor).get();
      if (snapshot.exists) {
        query = query.startAfter(snapshot);
      }
    }

    const snapshot = await query.get();
    const users = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    const lastDoc = snapshot.docs[snapshot.docs.length - 1];
    return {
      users,
      nextCursor: lastDoc ? lastDoc.id : null,
    };
  }

  async getUserById(id: string) {
    const doc = await this.firebaseService.getDb().collection(this.collection).doc(id).get();
    if (!doc.exists) throw new NotFoundException('User not found');
    return { id: doc.id, ...doc.data() };
  }
}
