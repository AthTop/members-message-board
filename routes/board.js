const { Router } = require("express");
const boardController = require("../controllers/board");
const router = Router();

router.get("/", boardController.get);

module.exports = router;
