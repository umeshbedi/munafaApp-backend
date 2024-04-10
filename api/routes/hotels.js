import express from "express";
import Hotels from "../models/Hotels.js";

const hotelsRouter = express.Router()

//Create
hotelsRouter.post("/", async (req, res)=>{
    const newHotel = Hotels(req.body)
    try {
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    } catch (error) {
        res.status(500).json(error)
    }
})

//update
hotelsRouter.put("/:id", async (req, res)=>{
    
    try {
        const updatedHotel = await Hotels.findByIdAndUpdate(
            req.params.id, 
            {$set:req.body},
            {new:true}
            )
        res.status(200).json(updatedHotel)
    } catch (error) {
        res.status(500).json(error)
    }
})


//delete
hotelsRouter.delete("/:id", async (req, res)=>{
    
    try {
        await Hotels.findByIdAndDelete(req.params.id)
        res.status(200).json("Hotels is deleted")
    } catch (error) {
        res.status(500).json(error)
    }
})

//get specfic hotel
hotelsRouter.get("/:id", async (req, res)=>{
    try {
        const hotel = await Hotels.findById(req.params.id)
        res.status(200).json(hotel)
    } catch (error) {
        res.status(500).json(error)
    }
})


//getAll
hotelsRouter.get("/", async (req, res)=>{
    try {
        const hotels = await Hotels.find()
        res.status(200).json(hotels)
    } catch (error) {
        res.status(500).json(error)
    }
})

export default hotelsRouter