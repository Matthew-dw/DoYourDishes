const express = require("express");
const router = express.Router();
const passport = require("passport");
const Validator = require("validator");
// Load House model
const House = require("../../models/House");

// Color generator
const colors = ['#7FDBFF', '#39CCCC', '#3D9970', '#2ECC40', '#01FF70', '#FFDC00', '#FF851B', '#FF4136', '#B10DC9', '#F012BE'];
const randColor = () => colors[Math.floor(Math.random()*colors.length)];

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
    // Validation
    if (!name)                      errors.name = "Name is required";
    if (!Validator.isEmail(email))  errors.email = "Email is invalid";
    if (!email)                     errors.name = "Email is required";
    if (errors.name || errors.email) return res.status(400).json(errors);
    const newHouse = new House({
        name: name,
        users: [email],
        pending: [],
        nicknames: [{username: email, nickname: '', color: randColor()}]
    })

    newHouse.save()
    .then(house => res.json(house))
    .catch(err => console.log(err));
});

// @route POST api/houses/:id
// @desc Remove user
// @access Private
router.delete("/:id", passport.authenticate("jwt", { session: false }),  (req, res) => {
    House.findByIdAndDelete(req.params.id).then(res.json({message: 'House deleted successfully!' }));
});

// @route POST api/:id/updatename
// @desc Update name of house
// @access Private
router.post("/:id/updatename", passport.authenticate("jwt", { session: false }), (req, res) => {
    const email = req.user.email;
    const id = req.params.id;
    const newName = req.body.name;
    const errors = {};
    // Validation
    if (!newName)                      errors.name = "Name is required";
    if (errors.name || errors.email) return res.status(400).json(errors);

    House.findById(id).then(house => {
        if (!house.users.includes(email)) return res.status(400).json({email: 'Must be in house'});
        house.name = newName;
        house.save()
        .then(house => res.json(house))
        .catch(err => console.log(err));
    });  
});

// @route POST api/houses/:id
// @desc Add user
// @access Private
router.post("/:id", passport.authenticate("jwt", { session: false }),  (req, res) => {
    const email = req.user.email;
    const id = req.params.id;
    House.findById(id).then(house => {
        if (house.users.includes(email)) return res.status(400).json({email: 'user already in house'});
        if (house.pending.includes(email)) return res.status(400).json({email: 'user already pending house join'});
        house.pending.push(email);
        house.save()
        .then(house => res.json(house))
        .catch(err => console.log(err) && console.log('add user'));
    });    
});

// @route POST api/houses/:id/removeuser
// @desc Remove user
// @access Private
router.post("/:id/removeuser", passport.authenticate("jwt", { session: false }),  (req, res) => {
    const email = req.user.email;
    const id = req.params.id;
    const index = req.body.index;
    House.findById(id).then(house => {
        if (!house.users.includes(email)) return res.status(400).json({email: 'user not in house'});
        house.users.splice(index, 1);

        if (house.users.length === 0) House.findByIdAndDelete(id).then(res.json({message: 'House deleted successfully!' }));
        else {
            house.save()
            .then(house => res.json(house))
            .catch(err => console.log(err));}
    });  
});

// @route POST api/houses/:id/acceptuser
// @desc Accept pending user
// @access Private
router.post("/:id/acceptuser", passport.authenticate("jwt", { session: false }),  (req, res) => {
    const email = req.user.email;
    const id = req.params.id;
    const index = req.body.index;
    House.findById(id).then(house => {
        if (!house.users.includes(email)) return res.status(400).json({email: 'user not in house'});
        const user = house.pending[index];
        house.users.push(user);
        house.nicknames.push({username: user, nickname: '', color: randColor()})
        house.pending.splice(index, 1);
        house.save()
        .then(house => res.json(house))
        .catch(err => console.log(err));
    });    
});

// @route POST api/houses/:id/rejectuser
// @desc Reject pending user
// @access Private
router.post("/:id/rejectuser", passport.authenticate("jwt", { session: false }),  (req, res) => {
    const email = req.user.email;
    const id = req.params.id;
    const index = req.body.index;

    House.findById(id).then(house => {
        if (!house.users.includes(email)) return res.status(400).json({email: 'user not in house'});
        house.pending.splice(index, 1);
        house.save()
        .then(house => res.json(house))
        .catch(err => console.log(err));
    });    
});

// @route POST api/houses/:id/edituser
// @desc Edit user
// @access Private
router.post("/:id/edituser", passport.authenticate("jwt", { session: false }),  (req, res) => {
    const email = req.user.email;
    const id = req.params.id;
    const index = req.body.index;
    const color = req.body.color;
    const nickname = req.body.nickname;

    House.findById(id).then(house => {
        if (!house.users.includes(email)) return res.status(400).json({email: 'user not in house'});
        house.nicknames[index].color = color;
        house.nicknames[index].nickname = nickname;
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
    const userIndex = req.body.userIndex;
    const errors = {};
    console.log(req.body)
    if (!name)      errors.name = "Name is required";
    if (!start)     errors.start = "Start is required";
    if (!interval)  errors.interval = "Interval is required";
    if (!userIndex) errors.userIndex = "Users are required";
    if (errors.name || errors.start || errors.interval || errors.userIndex) return res.status(400).json(errors);

    House.findById(houseid).then(house => {
        for (let chore of house.chores) 
            if (chore.name === name) return res.status(400).json({name: "Chore with this name already exists"});
        
        const chore = {
            name: name,
            start: start,
            interval: interval,
            userIndex: userIndex
        }
        house.chores.push(chore);
        house.save()
        .then(house => res.json(house))
        .catch(err => res.status(400).json(err));
    });    
});

// @route POST api/houses/:id/removechore
// @desc Remove chore
// @access Private
router.post("/:id/removechore", passport.authenticate("jwt", { session: false }),  (req, res) => {
    const index = req.params.choreindex;
    const id = req.params.id;
    House.findById(id).then(house => {
        house.chores.splice(index, 1);
        house.save()
        .then(house => res.json(house))
        .catch(err => console.log(err));
    });
});

// @route POST api/houses/:id/editchore
// @desc Update chore
// @access Private
router.post("/:id/editchore",passport.authenticate("jwt", { session: false }),  (req, res) => {
    const id = req.params.id;
    const index = req.body.choreindex;
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