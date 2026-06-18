const express = require("express");
const router = express.Router();

const budgetController =
require("../controllers/budgetController");

const auth =
require("../middleware/auth");

router.post(
    "/budget",
    auth.isLoggedIn,
    budgetController.setBudget
);

module.exports = router;