const express = require("express");
const router = express.Router();

const itemController = require("../controllers/itemController");

router.get("/lists/:listId/items/new", itemController.new);
router.get("/lists/:listId/items/:id", itemController.show);
router.post("/lists/:listId/items/create", itemController.create);
router.post("/lists/:listId/items/:id/destroy", itemController.destroy);

module.exports = router;

