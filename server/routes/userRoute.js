import express from "express";
import { registerUser, loginUser} from "../controller/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

export default userRouter;