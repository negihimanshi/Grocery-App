const User = require("../models/User")
const jwt = require("jsonwebtoken");

// Generate JWT token
const generateToken = (id) =>{
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d"});
};

// Register User
exports.registerUser = async (req, res) => {
    const { fullName, email, password } = req.body;

    // Validation: Check for missing fields
    if (!fullName || !email || !password){
        return res.status(400).json({ message: "All fields are required"});
    }

    try {
        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser){
            return res.status(400).json( { message: "Email already in use"});
        }

        // Create the user
        const user = await User.create({
            fullName,
            email,
            password
        });

        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });
    } catch (err) {
        res
            .status(500)
            .json({ message: "Error registering user", error: err.message});
    }
};

// Login User
exports.loginUser = async (req, res) => {

    // if (!email || !password) {
    //     return res.status(400).json({ message: "All fields are required" });
    // }

    try {
        console.log("Request body received:", req.body); // Log the request body
        const { email, password } = req.body;
        // Explicitly select the password field
        const user = await User.findOne({ email }).exec();
        console.log("Found user:", user); // Debugging log

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        console.log("Stored Hashed Password:", user.password);

        if (!user.password) {
            return res.status(500).json({ message: "Password field is missing from user data" });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        res.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Error logging in user", error: err.message });
    }
};

// Get User Info
exports.getUserInfo = async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found"});
        }
        res.status(200).json(user);
    } catch (err) {
        res
            .status(500)
            .json({ message: "Error registering user", error: err.message});
    }
};

