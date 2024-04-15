import mongoose from "mongoose";
import User from "../models/user.model.js"
import bcrypt from "bcrypt";
export const userData = async (req, res, next) => {
    try {
        const users = await User.find().select("-password");
        res.status(200).json({ message: "User data retrieved successfully", success: true, users });
    } catch (error) {
        console.error("Error while fetching user data:", error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};
export const registerUser = async (req, res, next) => {
    const { username, password, email } = req.body;

    // Checking if all fields are there or not
    if (!username || !password || !email) {
        return res.status(400).json({ message: "All details are required", success: false });
    }

    try {
        // Hashing the password
        const hashPass = await bcrypt.hash(password, 10);

        const newUser = new User({ username, password: hashPass, email });

        // Saving the user to the database
        await newUser.save();
        return res.status(201).json({ message: "User registered successfully", success: true });
    } catch (error) {
        console.error("Error while registering user:", error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};
export const updateUser = async (req, res, next) => {
    const { id } = req.query;
    const { username, password, email } = req.body;

    // checking if the id is provided or not
    if (!id) {
        return res.status(400).json({ message: "User ID is required", success: false });
    }
    //checking for valid mongoID
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ error: "Invalid user ID" });
    }

    try {
        // Finding the user
        let user = await User.findById(id);

        // If user not found returning error
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }
        // Updating user properties if provided
        if (username) user.username = username;
        if (password) user.password = await bcrypt.hash(password, 10);
        if (email) user.email = email;

        // saving the user
        await user.save();
        return res.status(200).json({ message: "User updated successfully", success: true });
    } catch (error) {
        console.error("Error while updating user:", error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};
