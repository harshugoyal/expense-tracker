const Expense = require("../models/Expense");

exports.getExpenses = async (req, res) => {

    const expenses = await Expense.find();

    const total = expenses.reduce(
        (sum, expense) => sum + expense.amount,
        0
    );

    res.render("index", {
        expenses,
        total
    });
};

exports.addExpense = async (req, res) => {

    const expense = new Expense({
        title: req.body.title,
        amount: req.body.amount,
        category: req.body.category
    });

    await expense.save();

    res.redirect("/");
};

exports.deleteExpense = async (req, res) => {
    await Expense.findByIdAndDelete(req.params.id);
    res.redirect("/");
};

exports.showEditForm = async (req, res) => {
    const expense = await Expense.findById(req.params.id);
    res.render("editExpense", { expense });
};

exports.updateExpense = async (req, res) => {
    await Expense.findByIdAndUpdate(
        req.params.id,
        {
            title: req.body.title,
            amount: req.body.amount,
            category: req.body.category
        }
    );

    res.redirect("/");
};

exports.showForm = (req, res) => {
    res.render("addExpense");
};

exports.searchExpense = async (req, res) => {

    const keyword = req.query.keyword;

    const expenses =
        await Expense.find({
            title: {
                $regex: keyword,
                $options: "i"
            }
        });

    const total = expenses.reduce(
        (sum, expense) => sum + expense.amount,
        0
    );

    res.render("index", {
        expenses,
        total
    });
};