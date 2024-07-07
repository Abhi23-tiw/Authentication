import dotenv from 'dotenv';
import User from '../models/userModel.js';
dotenv.config()
import jwt from 'jsonwebtoken';
import Token from '../models/token.js';
import { sendMail } from './sendMail.js';
import crypto from 'crypto';

export const forgetPassword = async(req,res)=>{
    try {
        const user = await User.findOne({mail: req.body.email})

        if(!user){
            return res.status(404).send({message: "User not found "});
        } 

        let token = await Token.findOne({ userId: user._id });
        if (!token) {
            token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
        }

        const link = `${process.env.BASE_URL}/password-reset/${user._id}/${token.token}`;
        await sendMail(user.email, "Password reset", link);


        
    } catch (err) {
        res.status(500).send({message: err.message});
    }
}