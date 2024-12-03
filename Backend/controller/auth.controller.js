import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utilis/generateToken.js";

export const signup = async (req, res) => {
  try {
    console.log("Received signup request:", req.body);

    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      console.log("Password mismatch");
      return res.status(400).json({ error: "Password doesn't match" });
    }

    console.log("Checking if username already exists...");
    const user = await User.findOne({ username });

    if (user) {
      console.log("Username already exists:", username);
      return res.status(400).json({ error: "Username already exists" });
    }

    // Hash Password Here
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // https://avatar-placeholder.iran.liara.run/

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    console.log("Creating new user...");
    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      ProfilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });
  
    if (newUser) {
      console.log("Saving new user...");
      await newUser.save();
        // Generate JWT token here 
      generateTokenAndSetCookie(newUser._id , res);
      console.log("User saved successfully:", newUser);

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        ProfilePic: newUser.ProfilePic,
      });
    } else {
      res.status(400).json({ error: "Invalid User Data" })
    };

  } catch (error) {
    console.error("Error in Signup Controller:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user in the database
    const user = await User.findOne({ username });

    // Check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid Username or Password" });
    }

    // Generate and set the token as a cookie
    generateTokenAndSetCookie(user._id, res);

    // Return user details in the response
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      ProfilePic: user.ProfilePic,
    });
  } catch (error) {
    console.error("Error in Login Controller:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", {maxAge: 0 });
    res.status(200).json({message: "Logged Out Successfully"});
  } catch (error) {
    console.error("Error in Logout Controller:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};