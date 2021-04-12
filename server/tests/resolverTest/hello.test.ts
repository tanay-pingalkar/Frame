import { graphqlCall } from "../../src/utils/graphqlCall";

const helloQuery = `
  {
    hello
  }
`;

describe("hello query test", () => {
  it("should return hello string", async () => {
    const hello = await graphqlCall(helloQuery);
    expect(hello).toEqual({
      data: {
        hello: "world",
      },
    });
  });
});
