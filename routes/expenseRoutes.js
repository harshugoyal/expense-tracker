const express = require("express");

const router = express.Router();

const expenseController =
require("../controllers/expenseController");

router.get(
    "/",
    expenseController.getExpenses
);
router.get("/add", expenseController.showForm);

router.post("/add", expenseController.addExpense);

router.get("/delete/:id", expenseController.deleteExpense);

router.get("/edit/:id", expenseController.showEditForm);

router.post("/edit/:id", expenseController.updateExpense);

router.get(
    "/search",
    expenseController.searchExpense
);
module.exports = router;