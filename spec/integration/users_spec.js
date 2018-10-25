const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/users";
const User = require("../../src/db/models").User;
const sequelize = require("../../src/db/models/index").sequelize;


describe("routes : users", () => {

    beforeEach((done) => {
        sequelize.sync({force: true})
        .then(() => {
            done();
        })
        .catch((err) => {
            console.log(err);
            done();
        });
    });

    describe("GET users/sign_up", () => {

        it("should return a status code 200", (done) => {
            request.get(`${base}/sign_up`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("Sign up");
                done();
            });
        });
    });

    describe("POST /users", () => {

        it("should create a new user with valid values and redirect", (done) => {
            const options = {
                url: base,
                form: {
                    email: "user@user.com",
                    password: "iamuser",
                    firstName: "mr",
                    lastName: "user"
                }
            }
            request.post(options, (err, res, body) => {
                User.findOne({where: {email: "user@user.com"}})
                .then((user) => {
                    expect(user).not.toBeNull();
                    expect(user.email).toBe("user@user.com");
                    expect(user.firstName).toBe("mr");
                    expect(user.lastName).toBe("user");
                    expect(user.id).toBe(1);
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
            });
        });

        it("should not create a new user if invalid inputs are given", (done) => {
            request.post({
                url: base,
                form: {
                    email: "hello",
                    password: "1234567890",
                    firstName: "first",
                    lastName: "last"
                }
            }, (err, res, body) => {
                User.findOne({where: {email: "hello"}})
                .then((user) => {
                    expect(user).toBeNull();
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
            });
        });
    });

    describe("GET /users/sign_in", () => {

        it("should render a view with a sing in form", (done) => {
            request.get(`${base}/sign_in`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("Sign in");
                done();
            });
        });
    });
});