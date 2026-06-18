const Expense = require("../models/expense");
const Budget = require("../models/budget");

exports.getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({ user: req.session.userId }).sort({ date: -1 });
        const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        const budget = await Budget.findOne({user: req.session.userId});

        // group expenses by category for chart
        const categoryTotals = {};
        expenses.forEach(expense => {
            if (categoryTotals[expense.category]) {
                categoryTotals[expense.category] += expense.amount;
            } else {
                categoryTotals[expense.category] = expense.amount;
            }
        });

        const chartLabels = Object.keys(categoryTotals);
        const chartData = Object.values(categoryTotals);
        const remaining = budget ? budget.amount - total : 0;

        res.render("index", {
        expenses,
        total,
        budget,
        remaining,
        chartLabels,
        chartData,
        userName: req.session.userName
        });
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
        date: req.body.date,        // ← add this
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
            category: req.body.category,
            date: req.body.date        // ← add this
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
        const budget = await Budget.findOne({user: req.session.userId});
        const remaining = budget ? budget.amount - total : 0;

       
        res.render("index", {
            expenses,
            total,
            budget,
            remaining,
            userName: req.session.userName,
            chartLabels: [],
            chartData: []
        });
        
    } catch (err) {
        console.error(err);
        res.status(500).send("Something went wrong");
    }
};