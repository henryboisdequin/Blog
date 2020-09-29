import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import mikroConfig from "./mikro-orm.config";

const main = async () => {
  // Connect to database
  const orm = await MikroORM.init(mikroConfig);

  //   Get migrations
  await orm.getMigrator().up();

  //   Insert post into database
  //   const post = orm.em.create(Post, { title: "First Post" });
  //   await orm.em.persistAndFlush(post);

  //   Find posts
  const posts = await orm.em.find(Post, {});
  console.log(posts);
};

main().catch((err) => console.error(err));
