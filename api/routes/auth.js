import express from "express";
import Users from "../models/Users.js";
import bcrypt from "bcryptjs";
import { sendEmail } from "../utils/sendMail.js";

const {genSaltSync, hashSync, compare} = bcrypt

const authRouter = express.Router()


authRouter.post("/register", async (req, res)=>{
    const salt = genSaltSync(10)
    const hash = hashSync(req.body.password, salt)
    try {
        const user = await Users.findOne({email:req.body.email})
        if(user) return res.status(405).send("user exist")
        const newUser = new Users({
            name:req.body.name,
            email:req.body.email,
            password:hash
        })
        const createdUser = await newUser.save()
        return res.status(200).json(createdUser)

        
    } catch (error) {
        console.log(error)
        res.send(error.message)
    }
    
})


authRouter.post("/otpverify", (req, res)=>sendEmail(req, res))

authRouter.post("/login", async (req, res)=>{
    
    try {
        const user = await Users.findOne({email:req.body.email})
        if (!user) return res.status(401).send("user not found")

        const isPassworCorrect = await compare(req.body.password, user.password)
        if(!isPassworCorrect) return res.status(402).send("Password is incorrect!")

        const {password, ...otherDetails} = user._doc

        res.status(200).json(otherDetails)
    } catch (error) {
        console.log(error)
        res.send(error.message)
    }
    
})



export default authRouter