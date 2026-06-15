const express = require("express");

const router = express.Router();

const authController =
    require("../controllers/authController");


router.get(
    "/register",
    authController.showRegister
);

module.exports = router;
router.post(
    "/register",
    authController.register
);
router.get(
    "/login",
    authController.showLogin
);
router.post(
    "/login",
    authController.login
);