const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/lists";
const sequelize = require("../../src/db/models/index").sequelize;

const List = require("../../src/db/models").List;
const Item = require("../../src/db/models").Item;

describe("routes : items ", () => {

    beforeEach((done) => {
        this.list;
        this.item;

        sequelize.sync({ force: true}).then((res) => {

            List.create({
                title: "Cat stuff",
                description: "What the cats need"
            })
            .then((list) => {
                this.list = list;

                Item.create({
                    name: "Litter",
                    description: "Feline Pine",
                    listId: this.list.id
                })
                .then((item) => {
                    this.item = item;
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
            });
        });
    });

    describe("GET /lists/:listId/items/new", () => {

        it("should render a new item field", (done) => {
            request.get(`${base}/${this.list.id}/items/new`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("New Item");
                done();
            });
        });
    });

    describe("POST /lists/:listId/items/create", () => {

        it("should create a new item and redirect", (done) => {
            const options = {
                url: `${base}/${this.list.id}/items/create`,
                form: {
                    name: "Christmas List",
                    description: "Santa's nice list"
                }
            };
            request.post(options, (err, res, body) => {
                
                Item.findOne({ where: {name: "Christmas List"}})
                .then((item) => {
                    expect(item).not.toBeNull();
                    expect(item.name).toBe("Christmas List");
                    expect(item.description).toBe("Santa's nice list");
                    expect(item.listId).not.toBeNull();
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
            });
        });
    });

    describe("GET /lists/:listId/items/:id", () => {

        it("should render a view with the correct item", (done) => {
            request.get(`${base}/${this.list.id}/items/${this.item.id}`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("Litter");
                done();
            });
        });
    });


    describe("POST /lists/:listId/item/:id/destroy", () => {

        it("should delete the item with the associated id", (done) => {

            expect(this.item.id).toBe(1);
            request.post(`${base}/${this.list.id}/items/${this.item.id}/destroy`, (err, res, body) => {
                Item.findById(1)
                .then((item) => {
                    expect(err).toBeNull();
                    expect(item).toBeNull();
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                })
            });
        });
    });

    describe("GET /lists/:listId/items/:id/edit", () => {

        it("should render a view with an edit item form", (done) => {
            request.get(`${base}/${this.list.id}/items/${this.item.id}/edit`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("Edit Item");
                expect(body).toContain("Litter");
                done();
            });
        });
    });

    describe("POST /lists/:listId/items/:id/update", () => {

        it("should return a status code 302", (done) => {
            request.post({
                url: `${base}/${this.list.id}/items/${this.item.id}/update`,
                form: {
                    name: "Scratch Post",
                    description: "horizontal"
                }
            }, (err, res, body) => {
                expect(res.statusCode).toBe(302);
                done();
            });
        });

        it("should update the given item with the correct values", (done) => {

            const options = {
                url: `${base}/${this.list.id}/items${this.item.id}/update`,
                form: {
                    name: "Scatch Post"
                }
            };

            request.post(options, (err, res, body) => {
                expect(err).toBeNull();
                
                Item.findOne({
                    where: { id: this.item.id}
                })
                .then((item) => {
                    expect(item.name).toBe("Litter");
                    done();
                });
            });
        });


    });


});