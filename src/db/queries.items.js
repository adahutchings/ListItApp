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
    }
}