const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/users";

describe("routes : users", () => {

  describe("GET users/sign_up", () => {

    it("should return a status code 200", (done) => {
      request.get(`${base}/sign_up`, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        done();
      });
    });

  });
});