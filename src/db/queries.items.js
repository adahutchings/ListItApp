const List = require("./models").List;
const Item = require("./models").Item;

module.exports = {

    addItem(newItem, callback){
        return Item.create(newItem)
        .then((item) => {
            callback(null, item);
        })
        .catch((err) => {
            callback(err);
        })
    },

    getItem(id, callback){
        return Item.findById(id)
        .then((item) => {
            callback(null, item);
        })
        .catch((err) => {
            callback(err);
        })
    },

    deleteItem(req, callback) {
        return Item.findById(req.params.id)
        .then((item) => {
            item.destroy()
            .then((res) => {
                callback(null, item);
            });
        })
        .catch((err) => {
            callback(err);
        });
        
    },
}