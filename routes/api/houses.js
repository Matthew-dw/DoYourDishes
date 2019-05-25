const express = require("express");
const router = express.Router();
const passport = require("passport");
const Validator = require("validator");
// Load House model
const House = require("../../models/House");

// @route get api/houses/:id
// @desc get houses a given user id is in 
// @access Private
router.get("/:id",  (req, res) => {
    const user = req.params.id;
    House.find({ users: user }).then(houses => {
        res.json(houses);
    });    
});

// @route POST api/houses/create
// @desc Register user
// @access Private
router.post("/create",  (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const errors = {};

    // Validation
    if (!name)                      errors.name = "Name is required";
    if (!Validator.isEmail(email))  errors.email = "Email is invalid";
    if (!email)                     errors.name = "Email is required";
    if (errors.name || errors.email) return res.status(400).json(errors);

    const newHouse = new House({
        name: name,
        users: [email]
    })

    newHouse.save()
    .then(house => res.json(house))
    .catch(err => console.log(err));
});

// @route POST api/houses/:id/adduser
// @desc Add user
// @access Private
router.post("/:id/adduser",  (req, res) => {
    const email = req.body.email;
    const id = req.params.id;
    const errors = {};

    if (!Validator.isEmail(email))  errors.email = "Email is invalid";
    if (email.length === 0)         errors.email = "Email is required";
    if (errors.email) return res.status(400).json(errors);

    House.findById(id).then(house => {
        house.users.push(email);
        house.save()
        .then(house => res.json(house))
        .catch(err => console.log(err));
    });    
});

// @route POST api/houses/:id/removeuser
// @desc Remove user
// @access Private
router.post("/:id/removeuser",  (req, res) => {
    const email = req.body.email;
    const id = req.params.id;
    const errors = {};

    if (!Validator.isEmail(email))  errors.email = "Email is invalid";
    if (email.length === 0)         errors.email = "Email is required";
    if (errors.email) return res.status(400).json(errors);
    
    House.findById(id).then(house => {
        var index = house.users.indexOf(email);
        if (index !== -1) house.users.splice(index, 1);
        house.save()
        .then(house => res.json(house))
        .catch(err => console.log(err));
    });
});

// @route POST api/houses/:id/adduser
// @desc Add user
// @access Private
router.post("/:id/addchore",  (req, res) => {
    const houseid = req.params.id;
    const name = req.body.name;
    const start = req.body.start;
    const interval = req.body.interval;
    const userIndex = req.body.userIndexs;
    const errors = {};
    
    if (!name)      errors.name = "Name is required";
    if (!start)     errors.start = "Start is required";
    if (!interval)  errors.interval = "Interval is required";
    if (!userIndex) errors.userIndex = "Users are required";
    if (errors.email || errors.name || errors.start || errors.interval || errors.userIndex) return res.status(400).json(errors);

    House.findById(houseid).then(house => {
        for (let chore of house.chores) 
            if (chore.name === name) return res.status(400).json({name: "Chore with this name already exists"});
        
        const chore = {
            name: name,
            start: start,
            interval: interval,
            userIndex: userIndex.split()
        }
        house.chores.push(chore);
        house.save()
        .then(house => res.json(house))
        .catch(err => console.log(err));
    });    
});

// @route POST api/houses/:id/removeuser
// @desc Remove user
// @access Private
router.delete("/:id/:choreindex",  (req, res) => {
    const index = req.body.choreindex;
    const id = req.params.id;
    
    House.findById(id).then(house => {
        house.chores.splice(index, 1);
        house.save()
        .then(house => res.json(house))
        .catch(err => console.log(err));
    });
});

// @route POST api/houses/:id/removeuser
// @desc Remove user
// @access Private
router.post("/:id/:choreindex",  (req, res) => {
    const index = req.body.choreindex;
    const id = req.params.id;
    const name = req.body.name;
    const start = req.body.start;
    const interval = req.body.interval;
    const userIndex = req.body.userIndexs;
    const errors = {};
    
    if (!name)      errors.name = "Name is required";
    if (!start)     errors.start = "Start is required";
    if (!interval)  errors.interval = "Interval is required";
    if (!userIndex) errors.userIndex = "Users are required";
    if (errors.email || errors.name || errors.start || errors.interval || errors.userIndex) return res.status(400).json(errors);

    House.findById(id).then(house => {
        house.chores[index] = {
            name: name,
            start: start,
            interval: interval,
            userIndex: userIndex.split()
        }
        house.save()
        .then(house => res.json(house))
        .catch(err => console.log(err));
    });
});

module.exports = router;