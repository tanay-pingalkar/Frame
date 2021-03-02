import "reflect-metadata";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { hello } from "./resolvers/hello";
import { User } from "./resolvers/user";
import dotenv from "dotenv";
dotenv.config({ path: __dirname + "/../../.env" });

const PORT = process.env.PORT || 4000;
async function main() {
  await createConnection({
    type: "postgres",
    username: process.env.NAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    entities: ["./dist/entities/users.js"],
    synchronize: true,
  });
  const schema = await buildSchema({
    resolvers: [hello, User],
  });
  const server = new ApolloServer({ schema });
  await server.listen(PORT);
  console.log("Server has started!");
}
main();
