import { verify } from "jsonwebtoken";
import { jwtgen } from "../../src/utils/jwt";
import dotenv from "dotenv";
dotenv.config();
describe("gonna check if jwt gen util works", () => {
  it("should generate jwt token", () => {
    const token = jwtgen(2);
    expect(typeof token).toBe("string");
    const ans: any = verify(token, process.env.JWT_SECRET);
    expect(ans.user).toBe(2);
  });
});
