const { Router } = require("express");
const secretController = require("../controllers/secret");
const router = Router();

router.get("/", secretController.get);
router.post("/", secretController.post);

module.exports = router;
