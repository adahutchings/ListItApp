const sequelize = require("../../src/db/models/index").sequelize;
const List = require("../../src/db/models").List;
const Item = require("../../src/db/models").Item;

describe("Item", () => {

    beforeEach((done) => {
        this.list;
        this.item;
        sequelize.sync({ force: true }).then((res) => {

            List.create({
                title: "A Veggie List",
                description: "Veggies needed this week"
            })
            .then((list) => {
                this.list = list;

                Item.create({
                    name: "Squash",
                    description: "Either butternut or spaghetti",
                    listId: this.list.id
                })
                .then((item) => {
                    this.item = item;
                    done();
                });
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        });
    });

    describe("#create()", () => {

        it("should create a list item with name and description", (done) => {
            Item.create({
                name: "Eggplant",
                description: "Large - for baba",
                listId: this.list.id
            })
            .then((item) => {
                expect(item.name).toBe("Eggplant");
                expect(item.description).toBe("Large - for baba");
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        });

        it("should not create an item with a missing name", (done) => {
            Item.create({
                description: "Red please"
            })
            .then((item) => {
                done();
            })
            .catch((err) => {
                expect(err.message).toContain("Item.name cannot be null");
                done();
            })
        });


    });

    describe("#setList()", () => {

        it("should associate a list and item together", (done) => {

            List.create({
                title: "Back to School",
                description: "What the kids need"
            })
            .then((newList) => {
                expect(this.item.listId).toBe(this.list.id);

                this.item.setList(newList)
                .then((item) => {
                    expect(item.listId).toBe(newList.id);
                    done();
                });
            });
        });
    });

    describe("#getList()", () => {

        it("should return the associated List", (done) => {
            this.item.getList()
            .then((associatedList) => {
                expect(associatedList.title).toBe("A Veggie List");
                done();
            });
        });
    });


});