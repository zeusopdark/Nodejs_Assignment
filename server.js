import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import morgan from "morgan";
import connectDb from "./helper/Connection.js";
import userRoutes from "./routes/user.routes.js"
const PORT = process.env.PORT || 3000;
// Establish MongoDB connection
connectDb();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));

// Routes
app.use("/api/user", userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
