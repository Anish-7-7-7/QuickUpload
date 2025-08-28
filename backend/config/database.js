const mongoose = require('mongoose');
require("dotenv").config();

const dbconnect = ()=>{
mongoose.connect(process.env.MONGODB_URL,{
useUnifiedTopology: true,
useNewUrlParser: true
})
.then(()=>{console.log("DB connection is DONE")})
.catch((error)=>{
    console.log("ISSUE in DB connection");
    console.error(error.message);
    process.exit(1);
});
}

module.exports = dbconnect;