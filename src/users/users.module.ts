import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { FirebaseService } from '../firebase/firebase.service'; 
import { ConfigModule } from '@nestjs/config';
import { UsersResolver } from './users.resolver';

@Module({
  imports: [ConfigModule], 

  providers: [UsersService,UsersResolver, FirebaseService], 
  controllers: [UsersController],
  exports: [UsersService], 
})
export class UsersModule {}
