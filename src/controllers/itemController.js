const itemQueries = require("../db/queries.items.js");

module.exports = {

    new(req, res, next){
        res.render("items/new", {listId: req.params.listId});
    },

    create(req, res, next){
        let newItem = {
            name: req.body.name,
            description: req.body.description,
            listId: req.params.listId
        };
        itemQueries.addItem(newItem, (err, item) => {
            if(err){
                res.redirect(500, "/items/new");
            } else {
                res.redirect(303, `/lists/${newItem.listId}`);
            }
        });
    },

    show(req, res, next) {
        itemQueries.getItem(req.params.id, (err, item) => {
            if(err || item == null){
                console.log(err);
                res.redirect(404, "/");
            } else {
                res.render("items/show", {item});
            }
        });
    },

    destroy(req, res, next) {
        itemQueries.deleteItem(req, (err, item) => {
            if(err){
                res.redirect(500, `/lists/${req.params.listId}/items/${req.params.id}`)
            } else {
                res.redirect(303, `/lists/${req.params.listId}`)
            }
        });
    }
}