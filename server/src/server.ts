import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { createSchema } from "./utils/createSchema";
import { createCon } from "./utils/createCon";

const app = express();
const PORT = process.env.PORT || 4000;

import dotenv from "dotenv";
dotenv.config();

async function main() {
  await createCon();
  const schema = await createSchema();
  const server = new ApolloServer({ schema });
  server.applyMiddleware({
    app,
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });
  app.use(express.static(__dirname + "/../../images"));
  app.listen(PORT, () => {
    console.clear();
    console.log(`Server has started on ${PORT} 🚀`);
  });
}
main();
