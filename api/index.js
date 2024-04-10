import express from "express";
import { configDotenv } from "dotenv";
import mongoose from "mongoose";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/users.js";
import payoutRouter from "./routes/payout.js";
import orderPaymenRouter from "./payments/orderpayment.js";
import updatePaymenRouter from "./payments/updatePayment.js";



const app = express()
configDotenv()

const connect = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        .then(()=>console.log("Connected to Mongodb"))
    } catch (error) {
        console.log(error)
    }
}

mongoose.connection.on("disconnected", ()=>{
    console.log("Mongodb Disconnected!")
})

//middleware
app.use(express.json())
app.use("/api/auth", authRouter)
app.use("/api/users", userRouter)
app.use("/api/payout", payoutRouter)
app.use("/api/orderPayment", orderPaymenRouter)
app.use("/api/updatepayment", updatePaymenRouter)


app.listen(3000, () => console.log("Server ready on port 3000."));
