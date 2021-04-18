import { isUrl } from "../client/js/verifier";

describe("Testing the submit functionality", () => {
  test("Testing the isUrl() function is defined", () => {
    expect(isUrl).toBeDefined();
  });
  test("Testing the isUrl valid input to return true", () => {
    expect(isUrl("https://www.youtube.com/")).toEqual(true);
  });
});
