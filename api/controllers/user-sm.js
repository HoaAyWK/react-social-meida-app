const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user-sm');
const { signinValidation, signupValidation } = require('../validation/validation');

module.exports.createNewUser = async (req, res) => {
    const { error } = signupValidation(req.body);
    if (error) {
        return res.status(500).json({message: error.details[0].message});
    }
    try {        
        const emailExist = await User.findOne({email: req.body.email});
        if (emailExist) {
            return res.status(409).json({messae: 'Email already exists'});
        } else {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
            });
            const saveUser = await user.save();
            res.status(201).json({message: 'Create user successful'});
        }
    } catch(err) {
        res.status(500).json({error: err.message});
    }
};

module.exports.postSignin = async (req, res) => {
    const { error } = signinValidation(req.body);
    if (error) {
        return res.status(500).json({message: error.details[0].message});
    }
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            res.satus(404).json({message: 'Auth failed'});
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(500).json({message: 'Auth failed'});
        const token = jwt.sign({
            email: user.email,
            userId: user._id
        }, process.env.JWT_KEY,
        {
            expiresIn: '2h'
        });       
        res.status(200).json({message: 'Auth successful', token});
    } catch(err) {
        res.status(500).json({error: err.message});
    }
};