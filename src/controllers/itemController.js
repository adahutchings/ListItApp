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
                res.redirect(303, `/lists/${newItem.listId}/items/${item.id}`);
            }
        });
    }
}