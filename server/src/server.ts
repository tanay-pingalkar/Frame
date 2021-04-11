import "reflect-metadata";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { hello } from "./resolvers/hello";
import { User } from "./resolvers/user";
import dotenv from "dotenv";
import { Frames } from "./resolvers/frame";
import { Users } from "./entities/users";
import { Frame } from "./entities/frame";
import express from "express";
import { Like } from "./entities/likes";
dotenv.config({ path: __dirname + "/../../.env" });

const app = express();
const PORT = process.env.PORT || 4000;

async function main() {
  await createConnection({
    type: "postgres",
    username: process.env.NAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    entities: [Users, Frame, Like],
    synchronize: true,
  });
  const schema = await buildSchema({
    resolvers: [hello, User, Frames],
  });
  const server = new ApolloServer({ schema });
  server.applyMiddleware({
    app,
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });
  app.use(express.static(__dirname + "/../images"));
  app.listen(PORT, () => {
    console.log("Server has started!");
  });
}
main();
