const { Router } = require("express");
const logoutController = require("../controllers/logout");
const router = Router();

router.get("/", logoutController.get);

module.exports = router;
