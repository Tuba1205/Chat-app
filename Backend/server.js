import path from "path";
import express from "express";                        //package input
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { app , server} from "./socket/socket.js";


import authRoutes from "./routes/auth.routes.js";      //file input
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";



import connectToMongoDB from "./db/connectToMongoDB.js"; //database


dotenv.config(); // Load environment variables


app.use(express.json()); // This parses incoming JSON requests
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use("/api/auth", authRoutes);     //middleware for routes
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);


// when we deploy our application we typically build and bundle our frontend code for optimization and performance
// reason. We use express static middleware to serve static files like html, css, js , image file, sound files
// from the frontend build directory.
app.use(express.static(path.join(__dirname, "/Frontend/dist")));


// now with this we are able to run our frontend from our server as well
app.get("*", (req, res) => {    
  res.sendFile(path.join(__dirname, "Frontend" , "dist" , "index.html"));
});

// Connect to MongoDB
connectToMongoDB();

app.get("/", (req, res) => {
  res.send("Server is running and connected to MongoDB");
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
