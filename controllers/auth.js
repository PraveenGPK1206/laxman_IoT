import User from "../models/User.js";
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken"


export const register = async (req, res, next) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    try {
        const newUser = new User({
            username: req.body.username,
            password: hash,
        })
        await newUser.save();

        const user = await User.findOne({ username: req.body.username });
        const token = jwt.sign({ id: user._id, name: user.username }, process.env.JWT);
        
        res.status(200).json({ username: user.username });
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {

    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return next(createError(400, 'User not found'));

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) return next(createError(400, 'Wrong password or Username'));

        const token = jwt.sign({ id: user._id, name: user.username }, process.env.JWT);

        const { password, ...otherDetails } = user._doc;
        res.cookie("access-token", token, { httpOnly: true }).status(200).json({ ...otherDetails });
    } catch (error) {
        next(error);
    }
};