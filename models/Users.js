import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    balance:{type:Number, default:0},
    upi:{type:String, default:"success@upi"},
    paymentHistory:{type:[{}]}
    
},
    { timestamps: true }

)

export default mongoose.model("Users", UserSchema)