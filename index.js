import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookieparser";
import authRoute from "./routes/auth.js"
import conditionsRoute from "./routes/conditions.js"



const app=express();
dotenv.config();

const connect= async ()=>{
    try{
        await mongoose.connect(process.env.MONGO);
        console.log('connected to mongodb');
    }
    catch(err){
        throw err;
    }
}

mongoose.connection.on("disconnected", ()=>{
    console.log('mongodb disconnected');
})

//middlewares
app.use(cors());
//app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRoute);
app.use('/api/conditions', conditionsRoute);

app.use((err, req, res, next)=>{
    const errStatus = err.status || 500;
    const errMsg = err.message || "something went wrong"
    return res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMsg,
        stack: err.stack
    })
});



app.listen(8000, ()=>{
    connect();
    console.log(`server started on 8000`);
});