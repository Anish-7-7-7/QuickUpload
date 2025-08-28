const express = require("express");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");

const cors = require("cors");

app.use(cors({
  origin: "https://quick-upload-seven.vercel.app", 
  credentials: true,               
}));


//middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const Port = process.env.PORT || 5000;

const route = require("./routes/route");
app.use("/api/v1",route);


app.listen(Port,()=>{
    console.log("Server Started");
});


//connect to database
const dbConnect = require("./config/database");
dbConnect();

app.get("/",(req,res)=>{
res.send(`<h1>We are on Home Page</h1>`);
})
