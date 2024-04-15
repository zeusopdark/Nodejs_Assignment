import mongoose from "mongoose";

const connectDb = () => {
    mongoose.connect(process.env.MONGO_URL);

    mongoose.connection.once("open", () => {
        console.log("Connection with MongoDB is established");
    });

    mongoose.connection.on("error", (err) => {
        console.error("Error in connection with the server:", err);
    });
};

export default connectDb;
