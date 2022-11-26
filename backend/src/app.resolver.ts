import { UseGuards } from '@nestjs/common';
import { Field, Int, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from './decorators/current-user.decorator';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { UsersService } from './users/users.service';

@ObjectType()
class User {
  @Field(() => Int)
  userId: number;

  @Field(() => String)
  username: 'john';
}

@Resolver()
export class AppResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  whoAmI(@CurrentUser() user: User) {
    return this.usersService.findById(user.userId);
  }
}
