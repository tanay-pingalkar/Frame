import { ValidateEmail } from "../../src/utils/validateEmail";

describe("gonna validate email", () => {
  it("should validate email", () => {
    expect(ValidateEmail("tanay@gmail.com")).toBeTruthy();
    expect(ValidateEmail("tanay.com")).toBeFalsy();
  });
});
