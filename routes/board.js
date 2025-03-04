const { Router } = require("express");
const boardController = require("../controllers/board");
const router = Router();

router.get("/", boardController.get);
router.post("/", boardController.post);
router.get("/newpost", boardController.getNewpost);
module.exports = router;
