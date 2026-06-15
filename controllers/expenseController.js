const Expense = require("../models/Expense");

exports.getExpenses = async (req, res) => {

    const expenses = await Expense.find({
    user: req.session.userId
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

exports.addExpense = async (req, res) => {

    const expense = new Expense({
        title: req.body.title,
        amount: req.body.amount,
        category: req.body.category,
        user: req.session.userId
    });

    await expense.save();

    res.redirect("/");
};

exports.deleteExpense = async (req, res) => {
    await Expense.findOneAndDelete({
    _id: req.params.id,
    user: req.session.userId
    });
    res.redirect("/");
};

exports.showEditForm = async (req, res) => {
    const expense = await Expense.findOne({
    _id: req.params.id,
    user: req.session.userId
    });
    res.render("editExpense", { expense });
};

exports.updateExpense = async (req, res) => {
    await Expense.findOneAndUpdate(
    {
        _id: req.params.id,
        user: req.session.userId
    },
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