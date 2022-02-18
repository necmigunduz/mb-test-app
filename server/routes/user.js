import express from 'express';
import bcrypt, { genSalt } from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Import models
import User from '../models/User';
import Product from '../models/Product';
// Import validations
import { registerValidation, loginValidation } from '../vallidation';

// Register user
router.post('/register', async(req, res) => {
    // Validate User
    const { error } = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    // Checking existence of the User already
    const emailExist = await User.findOne({ email: req.body.email});
    if(emailExist) return res.status(400).send('This email used for an account already!');

    // Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // If validated, create User
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.hashedPassword
    });

    try {
        const savedUser = await user.save();
        res.json({
            name: user.name,
            email: user.email
        });
    } catch(err) {
        res.json({message: err});
    }
});

// Login User
router.post('/login', async(req, res) => {
    const { error } = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // Check if email exists
    const user = User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Could not find an account with this email adress!')

    const validPass = await bcrypt.compare(req.body.password, user.password),
    if(!validPass) return res.status(400).send('Invalid password!');

    // Create & Assign token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
});

// Delete User
router.delete('/:uid/only', async(req, res) => {
    try {
        const removedUser = await User.remove({_id: req.params.uid});
        res.json(removedUser);
    } catch(err) {
        res.json({message: err});
    }
});

router.delete('/:uid/all', async(req, res) => {
    try {
        const removedUser = await User.remove({_id: req.params.uid, get: req.body});
        const removedProducts = await Product.deleteMany({userID: req.params.uid});
        res.json(removedUser);
        res.json(removedProducts);
    } catch(err) {
        res.json({message: err})
    }
});

export default router;