const express = require("express");

const router = express.Router();

const expenseController =
require("../controllers/expenseController");

const auth = require("../middleware/auth");

router.get(
    "/dashboard",
    auth.isLoggedIn,
    expenseController.getExpenses
);
router.get("/add", auth.isLoggedIn, expenseController.showForm);

router.post("/add", auth.isLoggedIn, expenseController.addExpense);

router.post("/delete/:id", auth.isLoggedIn, expenseController.deleteExpense);

router.get("/edit/:id", auth.isLoggedIn, expenseController.showEditForm);

router.post("/edit/:id", auth.isLoggedIn, expenseController.updateExpense);

router.get("/search", auth.isLoggedIn, expenseController.searchExpense);
module.exports = router;