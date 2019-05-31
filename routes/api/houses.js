const express = require("express");
const router = express.Router();
const passport = require("passport");
const Validator = require("validator");
// Load House model
const House = require("../../models/House");

// @route Get api/houses/
// @desc Get houses a user belongs to
// @access Private
router.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
    const user = req.user;
    House.find({ users: user.email }).then(houses => {
        if (houses) res.json(houses);
    });
});

// @route POST api/houses/create
// @desc Register user
// @access Private
router.post("/create", passport.authenticate("jwt", { session: false }), (req, res) => {
    const name = req.body.name;
    const email = req.user.email;
    const errors = {};
    console.log(req.user);
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

// @route POST api/houses/:id
// @desc Add user
// @access Private
router.post("/:id", passport.authenticate("jwt", { session: false }),  (req, res) => {
    const email = req.user.email;
    const id = req.params.id;
    House.findById(id).then(house => {
        if (house.users.includes(email)) return res.status(400).json({email: 'user already in house'});
        house.users.push(email);
        house.save()
        .then(house => res.json(house))
        .catch(err => console.log(err) && console.log('add user'));
    });    
});

// @route POST api/houses/:id/removeuser
// @desc Remove user
// @access Private
router.post("/:id/removeuser", passport.authenticate("jwt", { session: false }),  (req, res) => {
    const email = req.body.email;
    const id = req.params.id;
    const errors = {};
    
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
router.post("/:id/addchore", passport.authenticate("jwt", { session: false }),  (req, res) => {
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
router.delete("/:id/:choreindex", passport.authenticate("jwt", { session: false }),  (req, res) => {
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
// @desc Update chore
// @access Private
router.post("/:id/:choreindex",passport.authenticate("jwt", { session: false }),  (req, res) => {
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