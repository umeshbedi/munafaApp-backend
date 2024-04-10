import express from 'express'
import { addBeneficiary } from '../../payouthandler/addBeneficiary.jsy.js';

const payoutRouter = express.Router()


payoutRouter.post("/", (req, res) => {
    
    addBeneficiary(req, res)
    // console.log(req.body)
})

payoutRouter.get("/", (req, res) => {
    res.send("It's working")
})


export default payoutRouter