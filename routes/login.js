const { Router } = require("express");
const loginController = require("../controllers/login");
const router = Router();

router.get("/", loginController.get);
router.post("/", loginController.post);

module.exports = router;
