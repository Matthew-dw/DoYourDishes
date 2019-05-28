const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const Validator = require("validator");
// Model
const User = require("../../models/User");


// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const password2 = req.body.password2;
    const errors = {};

    // Validation
    if (name.length === 0)          errors.name = "Name is required";
    if (!Validator.isEmail(email))  errors.email = "Email is invalid";
    if (email.length === 0)         errors.name = "Email is required";
    if (password.length === 0)      errors.password = "Password is required";
    if (password2.length === 0)     errors.password2 = "Confirm your password";
    if (!Validator.isLength(password, { min: 6, max: 30 }))    errors.password = "Password must be at least 6 characters";
    if (!Validator.equals(password, password2))           errors.password2 = "Passwords must match";
    if (errors.email || errors.password || errors.password2 || errors.name) return res.status(400).json(errors);

    User.findOne({ email: req.body.email }).then(user => {
        if (user) return res.status(400).json({ email: "Email already exists" });
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        // Hash password before saving in database
        bcrypt.genSalt((err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
    });
});

router.post("/login", (req, res) => {    
    const email = req.body.email;
    const password = req.body.password;
    const errors = {};

    // Validation
    if (!Validator.isEmail(email))  errors.email = "Email is invalid";
    if (email.length === 0)         errors.email = "Email field is required";
    if (password.length === 0)      errors.password = "Password field is required";
    if (errors.email || errors.password) return res.status(400).json(errors);

    User.findOne({ email }).then(user => {
        if (!user) return res.status(404).json({ emailnotfound: "Email not found" });
        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User matched
                // Create JWT Payload
                const payload = {
                    id: user.id,
                    name: user.name
                };
                // Sign token
                jwt.sign(payload, keys.secretOrKey, { expiresIn: 31556926 },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
            } else {
            return res
                .status(400)
                .json({ passwordincorrect: "Password incorrect" });
            }
        });
    });
});
module.exports = router;