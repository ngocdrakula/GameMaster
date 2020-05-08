const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/gamemaster', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if(err){
        console.log("Can't connect Database");
    }
    else{
        console.log("Connected Database!");
    }
})

const app = express();

app.get("/", (req, res) => {
    res.json({
        success: true
    })
})

app.listen(1505, (err) => {
    if(err){
        console.log("Can't start Server by: ", err);
    }
    else{
        console.log("Server started!");
    }
})