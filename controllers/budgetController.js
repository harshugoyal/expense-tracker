const Budget = require("../models/budget");

exports.setBudget = async (req, res) => {

    await Budget.findOneAndUpdate(
        { user: req.session.userId },
        {
            amount: req.body.amount,
            user: req.session.userId
        },
        { upsert: true }
    );

    res.redirect("/expenses/dashboard");
};