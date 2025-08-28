const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();



exports.signup = async (req, res) => {
  try {
    const { name, email, password, respassword } = req.body;

    if (!name || !email || !password || !respassword) {
      return res.status(400).json({ success: false, message: "All fields required" });
    }

    if (password !== respassword) {
      return res.status(400).json({ success: false, message: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      respassword: hashedPassword, 
    });

    // Create JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};



//LOGIN        .............@@@@@

exports.Login = async(req, res)=>{
try{
  const{email,password} = req.body;

  if(!email || !password){
   return res.status(400)
   .json({
        success:false,
        message:"Please Fill all the entries",
      
     });
  }
  let existingUser = await User.findOne({email});
  if(!existingUser){
    return  res.status(401)
     .json({
        success:false,
        message:"Email is not signed in"
     });
  }

  const payload = {
   email:existingUser.email,
   id:existingUser._id,
  }
  //verify Password
  if(await bcrypt.compare(password,existingUser.password)){
  let token = jwt.sign(payload, process.env.JWT_SECRET,
   {
      expiresIn:"2h",
   });
   
   existingUser = existingUser.toObject();
   existingUser.token = token;
   existingUser.password = undefined;
   

   const options = {
      expires: new Date (Date.now() +7 * 24 * 60 * 60 * 1000),
      httpOnly:true
   }

   res.cookie("token",token,options).status(200)
     .json({
        success:true,
        token,
        existingUser,
        message:"User Logged IN"
     });
  }

  else{
    return res.status(403)
     .json({
        success:false,
        message:"Incorrect Password"
     });
  }
}

catch(err){
     console.error(err);
     return res.status(404)
     .json({
        success:false,
        data:"error hai bro",
     });

}
}



