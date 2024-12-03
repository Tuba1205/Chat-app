import express from "express";
import { getMessages, sendMessage } from "../controller/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();
 // authorization method we are using protectRoute which we can identify the user is login or not 
 router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);

export default router;