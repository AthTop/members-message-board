const { Router } = require("express");
const successController = require("../controllers/success");
const router = Router();

router.get("/", successController.get);

module.exports = router;
