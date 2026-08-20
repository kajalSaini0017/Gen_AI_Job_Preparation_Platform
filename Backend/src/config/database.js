const mongoose = require('mongoose');

async function connectDB(){
    const mongourl = process.env.MONGO_URL;
    if(!mongourl){
        console.log("MongoDB URL is not available");
        process.exit(1)
    }

    await mongoose.connect(mongourl)
    .then(()=>{
        console.log("MongoDB is connected to db")
    }).catch((error)=>{
         console.log(`MongoDB is not connected to db ${error}`)
         process.exit(1)
    })
}

module.exports = connectDB;