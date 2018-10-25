const express = require("express");
const router = express.Router();

const itemController = require("../controllers/itemController");

router.get("/lists/:listId/items/new", itemController.new);
router.post("/lists/:listId/items/create", itemController.create);

module.exports = router;

