import { Post } from "src/entities/Post";
import { Ctx, Query, Resolver } from "type-graphql";

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  posts(@Ctx ctx: MyContext) {
    return "Hello!";
  }
}
