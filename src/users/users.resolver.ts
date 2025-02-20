import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserType } from './user.type';

@Resolver(() => UserType) 
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => [UserType], { name: 'users' }) 
  async users(
    @Args('limit', { type: () => Int, nullable: true }) limit = 10, 
    @Args('cursor', { type: () => String, nullable: true }) cursor?: string,
  ) {
    return this.usersService.getUsers(limit, cursor);
  }
}
