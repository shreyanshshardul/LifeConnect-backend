const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./Models/Register"); // ✅ filename fix: 'Register' not 'Regsiter'
const { signupValidation, loginValidation , donarValidation, recipientValidation} = require("./Middleware/RegisterValidation");
const jwt = require("jsonwebtoken");
const Donar = require("./Models/Donar");
const Recipient = require("./Models/Recipient");

// Middleware to parse JSON
app.use(express.json());
const cors = require("cors");
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));


const PORT = process.env.PORT || 8080;

// Server start
app.listen(PORT, () => {
  console.log("✅ Connection Stabilised!");
});

// MongoDB connect
const uri = process.env.MONGO_URL;
mongoose
  .connect(uri)
  .then(() => {
    console.log("✅ Database connected!");
  })
  .catch((err) => {
    console.log("❌ Database error:", err);
  });

// Signup route
app.post("/signup", signupValidation, async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User already exists!", success: false });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res
      .status(201)
      .json({ message: "Successfully Signed Up!", success: true });
  } catch (err) {
    console.error("Signup error:", err);
    res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
});
app.post("/login", loginValidation, async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(403).json({ message: "User not found!", success: false });
    }

    // Check password
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(403).json({ message: "Password incorrect", success: false });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        email: user.email,
        _id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(201).json({
      message: "Successfully logged in!",
      success: true,
      token,
      email,
      name: user.name,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal server error", success: false });
  }
});

//donar route

app.post("/cards/donar" , donarValidation , async(req,res)=>{
  try{
    const {name , email  , city , blood_group , age} = req.body;

    const existingUser = await Donar.findOne({ email })
    if(existingUser){
      return res.status(409).json({message:"One post from one user" ,success : false});
    }

    const newDonar = new Donar({
      name,
      email,
      blood_group,
      city,
      age,
    })

    await newDonar.save();

    res.status(201).json({message:"Successfully Submitted" , success : true});
  }
  catch(err){
      console.log("error" , err);
      res.status(500).json({message:"Failed to post!"  , success:false});
  }
})

//recipeint route
app.post("/cards/recipient" , recipientValidation , async(req,res)=>{
  try{
       const {name , email , password , blood_group , age , city} = req.body;
   
    const existingUser =  await Recipient.findOne({email})
   if(existingUser){
  return res.status(409).json({message:"One post from one User!" , success : false})
}

     const newRecipient = new Recipient({
      name,
      email,
      blood_group,
      city,
      age,
    })

     await newRecipient.save();

     res.status(201).json({message:"Successfully posted!" , success:true});
  }catch(err){
    console.log("Error" , err);
    res.status(500).json({message:"Failed to post !" , success:false});
  }
 
})

app.get("/cards/donar", async (req, res) => {
  try {
    const donors = await Donar.find();
    res.status(200).json({ success: true, donors });
  } catch (err) {
    console.log("Error", err);
    res.status(500).json({ success: false, message: "Error fetching donors" });
  }
});


app.get("/cards/recipient" , async(req,res)=>{
  try{
    const recipient = await Recipient.find();
    res.status(200).json({success : true , recipient});
  } catch(err){
    console.log("Error", err);
    res.status(500).json({ success: false, message: "Error fetching donors" });
  }
})
