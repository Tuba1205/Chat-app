import mongoose from "mongoose";

const connectToMongoDB = async () => {
    try {
        // Hardcoding URI temporarily for testing
        const mongoURI = "mongodb+srv://mubariktuba1205:HJUt1Di7Z22UyhVM@cluster0.px00y.mongodb.net/chat-app-db?retryWrites=true&w=majority&appName=Cluster0";
        
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
};

export default connectToMongoDB;
