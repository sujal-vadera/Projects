
const User = require("../models/User");
// tnis mongodb model using store data
const bcrypt = require("bcryptjs");
//useing password secure
const jwt = require("jsonwebtoken");
// const { use } = require("react");
// generate token 


//register 

const registerUser = async (req, res) => {
  try {
    const { name, email, contact, password, role } = req.body; // ye frontend mese lata he data 

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      
      return res.status(400).json({ message: "email already exists"});

    } // check user alerdy register


    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)


    const user = new User({
      name,
      email,
      contact,
      password: hashedPassword,
      role,
    }) // create new user becus save visit new user and data will be store in mongo db
    await user.save();


    res.status(201).json({
      msg: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        contact: user.contact,
        role: user.role,
      }
    })


  } catch (error) {
    console.log("Register error:", error);

    res.json({ status: 500, message: "Server register error" })
   

  }
}

//login

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    //email
    const user = await User.findOne({ email });//find user in db
    if (!user)
      return res.status(400).json({ success: false, message: "User not found" });

    //password 
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch)// password match
      return res.status(400).json({ success: false, message: "Invalid credentials" });



    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        contact: user.contact,
        role: user.role,
      },
    });



  } catch (error) {
    console.error("Login error:", error);
    res.json({ status: 500, message: "Server error" });
  }
}





module.exports = { registerUser, loginUser };