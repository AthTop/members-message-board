const { Router } = require("express");
const indexController = require("../controllers/index");
const router = Router();

router.get("/", indexController.get);

module.exports = router;
