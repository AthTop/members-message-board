const { Router } = require("express");
const registerController = require("../controllers/register");
const router = Router();

router.get("/", registerController.getForm);
router.post("/", registerController.postForm);

module.exports = router;
