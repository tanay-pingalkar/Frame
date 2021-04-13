import { createTestCon } from "./createCon";

module.exports = async () => {
  const connection = await createTestCon();
  await connection.dropDatabase();
  connection.close();
};
