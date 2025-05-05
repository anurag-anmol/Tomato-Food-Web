import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect("mongodb+srv://annu02:anu121212@cluster0.cyaumzp.mongodb.net/TomatoResume").then(() => console.log("DB Connected ..... "));
}