const User = require('../models/User');
const CustomError = require("../utilities/CustomError");

const Login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const check = await User.findOne({ email: email });

        if (check) {
            res.json("exist");
        } else {
            res.json("notexist");
        }
    } catch (e) {
        res.json("fail");
    }
};

const Signup = async (req, res) => {
    const { name, email, password } = req.body;

    const data = {
        name: name,
        email: email,
        password: password
    };

    try {
        const check = await User.findOne({ email: email });

        if (check) {
            res.json("exist");
        } else {
            res.json("notexist");
            await User.insertMany([data]);
        }
    } catch (e) {
        res.json("fail");
    }
};

module.exports = { Login, Signup };
