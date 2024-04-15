import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: [true, "Please provide a unique username"]
    },
    email: {
        type: "String",
        required: true,
        unique: [true, "Please provide a unique Email"]
    },
    password: {
        type: "String",
        required: true
    }
})

const User = mongoose.model.users || mongoose.model("User", userSchema);
export default User;