import dotenv from 'dotenv';
import User from '../models/userModel.js';
dotenv.config();
import jwt from 'jsonwebtoken';


/*
When a user wants to reset their password:

The app verifies the provided token to ensure it’s valid and hasn’t expired.

If the token is valid, the app search the user by the decoded userID from the token.

if user found then the app securely hashes the new password provided by the user.

The app updates the user’s password in the database with the new hashed password. */

export const resetPassword = async(req,res)=>{
    try {
        const decodedToken = jwt.verify(
            req.params.token,
            process.env.JWT_SECRET
        );

        if(!decodedToken){
            return res.status(401).send({message: "Invalid token "});
        }

        const user = await User.findOne({_id: decodedToken.userId});
        if(!user){
            return res.status(401).send({message : 'no user found '});
        }

        // hash the password
        const salt = await bcrypt.genSalt(10);
        req.body.confirmPassword = await bcrypt.hash(req.body.confirmPassword,salt);
        user.password = req.body.confirmPassword;
        await user.save();

        res.status(200).send({message : "Password Updated "});
    } catch (error) {
        res.status(500).send({message : error.message});
    }
}