import { graphqlCall } from "../../src/utils/graphqlCall";

const hello = `
{
  hello
}
`;

describe("user resolver test", () => {
  it("should register user", async () => {
    const res = await graphqlCall(hello);
    expect(res.data.hello).toBe("world");
  });
});
