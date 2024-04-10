import axios from 'axios';
import express from 'express'
import Users from '../models/Users.js';

const updatePaymenRouter = express.Router()

updatePaymenRouter.put("/credit", async (req, res) => {
    const { uid, data } = req.body;
    const timestamp = new Date();
    // Add the timestamp to the data object
    data.timestamp = timestamp;
    try {
        // Update payment history
        await Users.findByIdAndUpdate(
            uid,
            { $push: { paymentHistory: data } },
            { new: true }
        );

        // Add balance
        await Users.findByIdAndUpdate(
            uid,
            { $inc: { balance: data.payment_amount } },
            { new: true }
        );

        res.status(200).send("Payment updated successfully.");
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("An error occurred while updating payment.");
    }
    console.log(uid, data)
})

updatePaymenRouter.put("/debit", async (req, res) => {
    const { uid, data } = req.body;
    const timestamp = new Date();
    // Add the timestamp to the data object
    data.timestamp = timestamp;
    try {
        // Update payment history
        await Users.findByIdAndUpdate(
            uid,
            { $push: { paymentHistory: data } },
            { new: true }
        );

        // Add balance
        await Users.findByIdAndUpdate(
            uid,
            { $inc: { balance: -data.payment_amount } },
            { new: true }
        );

        res.status(200).send("Payment updated successfully.");
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("An error occurred while updating payment.");
    }
    console.log(uid, data)
})

export default updatePaymenRouter