import { Router } from "express";
import { registerUser, updateUser, userData } from "../controllers/user.controller.js";

const router = Router();


router.get("/getAllUser", userData)
    .post("/register", registerUser)
    .put("/updateUser/", updateUser)

export default router;      