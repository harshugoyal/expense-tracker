const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.showRegister = (req, res) => {
    res.render("register", {
        messages: {
            error: req.flash("error"),
            success: req.flash("success")
        }
    });
};

exports.register = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        await user.save();
        req.flash("success", "Registered successfully! Please login.");
        res.redirect("/login");
    } catch (err) {
        console.error(err);
        req.flash("error", "Something went wrong. Please try again.");
        res.redirect("/register");
    }
};

exports.showLogin = (req, res) => {
    res.render("login", {
        messages: {
            error: req.flash("error"),
            success: req.flash("success")
        }
    });
};

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            req.flash("error", "User not found.");
            return res.redirect("/login");
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            req.flash("error", "Wrong password.");
            return res.redirect("/login");
        }
        req.session.userId = user._id;
        req.session.userName = user.name;
        res.redirect("/expenses/dashboard");
    } catch (err) {
        console.error(err);
        req.flash("error", "Something went wrong. Please try again.");
        res.redirect("/login");
    }
};

exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
};