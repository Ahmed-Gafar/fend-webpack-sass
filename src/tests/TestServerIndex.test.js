const app = require("../server/index.js");
import "regenerator-runtime/runtime";
import { async } from "regenerator-runtime/runtime";
const axios = require("axios");
const request = require("supertest");
// const request = supertest(app);

describe("Testing server", () => {
  test("Testing server works", async () => {
    let server = await app.listen(8080, () =>
      console.log("Listening on port 8081")
    );
    if (process.env.NODE_ENV !== "test") {
      expect(false);
    }
  });
});
