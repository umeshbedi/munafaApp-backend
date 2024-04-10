import express from "express";
import Users from "../models/Users.js";

const userRouter = express.Router()

//update
userRouter.put("/:id", async (req, res) => {

    try {
        
    } catch (error) {
        res.status(500).json(error)
    }
})


//delete
userRouter.delete("/:id", async (req, res) => {

    try {
        
    } catch (error) {
        res.status(500).json(error)
    }
})

//get specfic User Data
userRouter.get("/:id", async (req, res) => {
    try {
        const userData = await Users.findById(req.params.id)
        const {password, ...allData} = userData._doc
        res.status(200).json(allData)
    } catch (error) {
        res.status(500).json(error)
    }
})



export default userRouter