require("./config/db");


const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.urlencoded({ extended: true }));

const expenseRoutes =
require("./routes/expenseRoutes");

app.use("/", expenseRoutes);

app.listen(3000, () => {
    console.log("Server Running on Port 3000");
});