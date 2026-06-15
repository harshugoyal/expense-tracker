const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.showRegister = (req, res) => {
    res.render("register");
};
exports.register = async (req, res) => {

    const hashedPassword =
        await bcrypt.hash(req.body.password, 10);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    await user.save();

    res.send("User Registered Successfully");
};

exports.showLogin = (req, res) => {
    res.render("login");
};

exports.login = async (req, res) => {

    const user = await User.findOne({
        email: req.body.email
    });

    if (!user) {
        return res.send("User Not Found");
    }

    const isMatch =
        await bcrypt.compare(
            req.body.password,
            user.password
        );

    if (!isMatch) {
        return res.send("Wrong Password");
    }

    req.session.userId = user._id;

    res.redirect("/");
};