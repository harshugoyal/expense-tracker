require("./config/db");
const session = require("express-session");


const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: "mysecretkey",
        resave: false,
        saveUninitialized: false
    })
);
const expenseRoutes =
require("./routes/expenseRoutes");

const authRoutes =
    require("./routes/authRoutes");

app.use("/", expenseRoutes);
app.use("/", authRoutes);


app.listen(3000, () => {
    console.log("Server Running on Port 3000");
});
