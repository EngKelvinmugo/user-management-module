import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppResolver } from './app.resolver';

import { ConfigModule } from '@nestjs/config';
import { FirebaseService } from './firebase/firebase.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true, 
    }),
    UsersModule,
  ],
  providers: [FirebaseService, AppResolver],
  exports: [FirebaseService],
})
export class AppModule {}
