import mongoose from "mongoose";

export const connectDB = async() => {
    await mongoose.connect('mongodb+srv://vikasbisht01:gYdaOF0gK5Bus2cK@cluster0.n399v.mongodb.net/food-delivery-app?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log("Database Connected");
    })

}
