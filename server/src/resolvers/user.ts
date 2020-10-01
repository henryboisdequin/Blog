import { MyContext } from "../types";
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  InputType,
  Field,
  Ctx,
  ObjectType,
} from "type-graphql";
import { User } from "../entities/User";
import argon2 from "argon2";
import { Field } from "@mikro-orm/postgresql";
import { EntityManager } from "@mikro-orm/postgresql";

@InputType()
class UsernamePasswordInput {
  @Field()
  username: string;

  @Field()
  password: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req, em }: MyContext) {
    if (!req.session.userId) {
      // not logged in
      return null;
    }

    const user = await em.findOne(User, { id: req.session.userId });
    return user;
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    if (options.username.length <= 1) {
      return {
        errors: [
          {
            field: "username",
            message: "Length of username must be greater than or equal to 1.",
          },
        ],
      };
    }

    if (options.password.length <= 4) {
      return {
        errors: [
          {
            field: "password",
            message: "Length of password must be greater than 4.",
          },
        ],
      };
    }

    const hashedPassword = await argon2.hash(options.password);
    let user;
    // const user = em.create(User, {
    //   username: options.username,
    //   password: hashedPassword,
    // });

    try {
      const result = await (em as EntityManager)
        .createQueryBuilder(User)
        .getKnexQuery()
        .insert({
          username: options.username,
          password: hashedPassword,
          created_at: new Date(),
          updated_at: new Date(),
        })
        .returning("*");
      user = result[0];
      // await em.persistAndFlush(user);
    } catch (err) {
      //err.code === "23505" || err.detail.includes("already exists")
      if (err.code === "23505") {
        // duplicate username error
        return {
          errors: [
            {
              field: "username",
              message: "Username already exists.",
            },
          ],
        };
      }
    }

    // set a 🍪 on the user, keep them logged in
    req.session.userId = user.id;
    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    const user = await em.findOne(User, {
      username: options.username,
    });
    if (!user) {
      return {
        errors: [
          {
            field: "username",
            message: "Could not find a user with that username.",
          },
        ],
      };
    }
    const valid = await argon2.verify(user.password, options.password);
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "Incorrect password.",
          },
        ],
      };
    }

    req.session.userId = user.id;

    return {
      user,
    };
  }
}
