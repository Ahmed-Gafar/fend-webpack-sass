const app = require("../server/index.js");
import "regenerator-runtime/runtime";
const axios = require("axios");
const request = require("supertest");
// const request = supertest(app);

describe("Testing server", () => {
  test("Testing server works", () => {
    let server = app.listen(8081, () => console.log('Listening on port 8081'));
    if (process.env.NODE_ENV !== 'test') {
        expect(false)
      }
  });
});
