import { Frame } from "../entities/frame";
import { Users } from "../entities/users";
import { Like } from "../entities/likes";
import { Connection, createConnection } from "typeorm";
import dotenv from "dotenv";

dotenv.config();
export const createCon = async (): Promise<Connection> => {
  return await createConnection({
    type: "postgres",
    username: process.env.NAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST || "localhost",
    entities: [Users, Frame, Like],
    synchronize: true,
  });
};

export const createTestCon = async (): Promise<Connection> => {
  console.log(process.env.TEST_NAME)
  return await createConnection({
    type: "postgres",
    username: process.env.TEST_NAME,
    password: process.env.TEST_PASSWORD,
    database: process.env.TEST_DATABASE,
    host: process.env.HOST || "localhost",
    entities: [Users, Frame, Like],
    synchronize: true,
    dropSchema: true,
  });
};
