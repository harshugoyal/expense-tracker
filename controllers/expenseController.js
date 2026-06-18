const Expense = require("../models/Expense");

exports.getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({ user: req.session.userId });
        const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        res.render("index", { expenses, total, userName: req.session.userName });
    } catch (err) {
        console.error(err);
        res.status(500).send("Something went wrong");
    }
};

exports.showForm = (req, res) => {
    res.render("addExpense");
};

exports.addExpense = async (req, res) => {
    try {
        const expense = new Expense({
            title: req.body.title,
            amount: req.body.amount,
            category: req.body.category,
            user: req.session.userId
        });
        await expense.save();
        res.redirect("/expenses/dashboard");
    } catch (err) {
        console.error(err);
        res.status(500).send("Something went wrong");
    }
};

exports.deleteExpense = async (req, res) => {
    try {
        await Expense.findOneAndDelete({
            _id: req.params.id,
            user: req.session.userId
        });
        res.redirect("/expenses/dashboard");
    } catch (err) {
        console.error(err);
        res.status(500).send("Something went wrong");
    }
};

exports.showEditForm = async (req, res) => {
    try {
        const expense = await Expense.findOne({
            _id: req.params.id,
            user: req.session.userId
        });
        res.render("editExpense", { expense });
    } catch (err) {
        console.error(err);
        res.status(500).send("Something went wrong");
    }
};

exports.updateExpense = async (req, res) => {
    try {
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
        res.redirect("/expenses/dashboard");
    } catch (err) {
        console.error(err);
        res.status(500).send("Something went wrong");
    }
};

exports.searchExpense = async (req, res) => {
    try {
        const keyword = req.query.keyword;
        const expenses = await Expense.find({
            user: req.session.userId,
            title: {
                $regex: keyword,
                $options: "i"
            }
        });
        const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        res.render("index", { expenses, total, userName: req.session.userName });
    } catch (err) {
        console.error(err);
        res.status(500).send("Something went wrong");
    }
};