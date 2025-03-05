const { Router } = require("express");
const deleteController = require("../controllers/delete");
const router = Router();

router.get("/:id", deleteController.get);

module.exports = router;
