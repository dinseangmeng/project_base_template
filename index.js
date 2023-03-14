require("dotenv").config();
const express= require('express')
const window =require('window')
const app=express()

app.get('/',(req,res)=>{
    res.json({
        msg:"It work"
    })
})

app.listen(process.env.PORT ?? 3000,()=>{
    console.log(`Server run on http://localhost:${process.env.PORT ?? 3000}`);
})