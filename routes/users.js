import express from "express";
import Users from "../models/Users.js";

const userRouter = express.Router()

//update
userRouter.put("/:id", async (req, res) => {
    const {name, upi} = req.body
    try {
        const updatedUser = await Users.findByIdAndUpdate(
            req.params.id, 
            {name, upi},
            {new:true}
            )
        res.status(200).json(updatedUser)

    } catch (error) {
        res.status(500).json(error)
    }
})


//delete
userRouter.delete("/:id", async (req, res) => {

    try {
        const deletedUser = await Users.findByIdAndDelete(req.params.id);
        if (deletedUser) {
            res.status(200).send("User has been deleted");
        } else {
            // If findByIdAndDelete returns null, the document with the provided ID doesn't exist
            res.status(404).send("User not found");
        }
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error deleting user:", error);
        res.status(500).send("Internal Server Error");
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