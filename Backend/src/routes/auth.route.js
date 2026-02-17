import express from "express";
import { signup, login, getMe, updateProfile, getAllUsers, deleteUser, changePassword } from "../controllers/auth.controller.js";
import { protect, admin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", protect, getMe);
router.put("/profile", protect, updateProfile);
router.put("/change-password", protect, changePassword);
router.delete("/profile", protect, deleteUser);
router.get("/users", protect, admin, getAllUsers);

export default router;
