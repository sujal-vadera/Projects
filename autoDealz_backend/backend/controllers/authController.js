// const User = require("../models/User");
// // tnis mongodb model using store data
// const bcrypt = require("bcryptjs");
// //useing password secure
// const jwt = require("jsonwebtoken");
// // generate token

// // REGISTER USER
// const registerUser = async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     } // check user alerdy register

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const user = new User({
//       name,
//       email,
//       password: hashedPassword,
//       role,
//     }); // craate new user and save database

//     await user.save();

//     res.status(201).json({
//       message: "User registered successfully",
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       },
//     });
//   } catch (error) {
//     console.error("Register error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // LOGIN USER
// const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user)
//       return res.status(400).json({ message: "User not found" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) // match password 
//       return res.status(400).json({ message: "Invalid credentials" });



//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.json({
//       message: "Login successful",
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       },
//     });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// module.exports = { registerUser, loginUser };



const User = require("../models/User");
// tnis mongodb model using store data
const bcrypt = require("bcryptjs");
//useing password secure
const jwt = require("jsonwebtoken");
// generate token 

const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    const existingUser = await User.findOne({email})
    if(existingUser){
     return res.json({status : 400 , "msg" : "user alredy exits"})
    }
    // check user alerdy register

  } catch (error) {

  }
}





module.exports = { registerUser, loginUser };