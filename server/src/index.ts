import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import mikroConfig from "./mikro-orm.config";

const main = async () => {
  const orm = await MikroORM.init(mikroConfig);

  const post = orm.em.create(Post, { title: "First Post" });
  await orm.em.persistAndFlush(post);
  console.log("---------sql2---------");
  await orm.em.nativeInsert(Post, { title: "First Post" });
};

main().catch((err) => console.error(err));
