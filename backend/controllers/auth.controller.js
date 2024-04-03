import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import {errorHandler}  from "../utils/error.js";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { TOKEN } from "../env.js";
dotenv.config()


export const signupRouter = async (req, res, next) => {
    const { email, username, password } = req.body;

    try {
        const hashPass = bcryptjs.hashSync(password, 10);
        const newUser = new User({ email, username, password: hashPass });
        await newUser.save();
        res.status(201).json('User saved successfully');
    } catch (err) {
        next(err);
    }
};


export const signinRouter = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const validUser = await User.findOne({email})
        console.log(validUser)
        if (!validUser) return next(errorHandler(404, 'user not found'))
        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if (!validPassword) return next(errorHandler(401, 'invalid password'))
        const token =  jwt.sign({id: validUser._id}, TOKEN)
        const {password: pass, ...rest} = validUser._doc
        res.cookie('access-token', token, {httpOnly: true}).status(200).json(rest)
    }catch(err){
        next(err)
    }
}

export const googleRouter = async (req, res, next) => {
    const {username, email, photo} = req.body
    console.log(username)
    try{
        const user = await User.findOne({email})
        if (user){
            const token = jwt.sign({id: user._id}, TOKEN);
            const { password: pass, ...rest} = user._doc;
            res.cookie('access-token', token, {httpOnly: true}).status(200).json(rest)
        }else{
            const generatedPass = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashPass = bcryptjs.hashSync(generatedPass, 10);
            const newUser = new User({username: username.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-8).email, photo, password: hashPass})
            await newUser.save()
            const token = jwt.sign({id: newUser._id}, TOKEN);
            const { password: pass, ...rest} = newUser._doc;s
            res.cookie('access-token', token, {httpOnly: true}).status(200).json(rest)
        }

    }catch(err){
        next(err)
}
}
