require("dotenv").config();
require("./config/db");
const session = require("express-session");


const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false
    })
);
const flash = require("connect-flash");
app.use(flash());

app.get("/", (req, res) => {
    res.render("home");
});
const expenseRoutes =
require("./routes/expenseRoutes");

const authRoutes =
    require("./routes/authRoutes");

const budgetRoutes =
require("./routes/budgetRoutes");

app.use("/expenses", expenseRoutes);
app.use("/expenses", budgetRoutes);
app.use("/", authRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
});

