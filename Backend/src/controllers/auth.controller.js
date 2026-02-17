import { User } from "../models/auth.model.js";
import jwt from "jsonwebtoken";
import cloudinary from "../config/cloudinary.js";

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};

export const signup = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;

        // Validate passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const user = await User.create({
            name,
            email,
            password,
            confirmPassword,
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                image: user.image || "",
                role: user.role,
                token: generateToken(user._id),
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (user && (await user.comparePassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                image: user.image || "",
                role: user.role,
                token: generateToken(user._id),
            });
            if (user.role === "admin") {
                console.log(`✅ Admin logged in successfully: ${user}`);
            } else {
                console.log(`✅ User logged in successfully: ${user.email}`);
            }

        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });

    }
};

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password -confirmPassword");
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update name if provided
        user.name = req.body.name || user.name;

        // Handle image upload (supports both file upload and base64)
        let imageData = null;

        if (req.file) {
            // File uploaded via form-data (multer)
            const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
            imageData = base64Image;
        } else if (req.body.image) {
            // Base64 string sent via JSON
            imageData = req.body.image;
        }

        if (imageData) {
            // If user already has an image, delete old one from Cloudinary
            if (user.image) {
                const oldPublicId = user.image.split("/").pop().split(".")[0];
                await cloudinary.uploader.destroy(`profile_images/${oldPublicId}`);
            }

            // Upload new image to Cloudinary
            const uploadResult = await cloudinary.uploader.upload(imageData, {
                folder: "profile_images",
                // transformation: [
                //     { width: 300, height: 300, crop: "fill", gravity: "face" },
                // ],
            });

            user.image = uploadResult.secure_url;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            image: updatedUser.image || "",
            role: updatedUser.role,
            token: generateToken(updatedUser._id),
        });
    } catch (error) {
        console.error("Error in updateProfile:", error.message);
        res.status(500).json({ message: error.message });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select("-password -confirmPassword");
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            return res.status(401).json({ message: "Not authorized" });
        }

        const user = await User.findByIdAndDelete(userId);

        if (user) {
            res.json({ message: "User account deleted successfully" });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword, confirmPassword } = req.body;

        // 1. Check if all fields are provided
        if (!currentPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Please provide current password, new password and confirm password",
            });
        }

        // 2. Get user from database (including password field)
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // 3. Check if current password is correct
        const isPasswordValid = await user.comparePassword(currentPassword);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Current password is incorrect",
            });
        }

        // 4. Check if new passwords match
        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "New passwords don't match!",
            });
        }

        // 5. Update password (pre-save hook will hash it automatically)
        user.password = newPassword;
        user.confirmPassword = newPassword;
        await user.save();

        // 6. Send success response
        return res.status(200).json({
            success: true,
            message: "Password updated successfully",
        });
    } catch (error) {
        console.error("Error in changePassword:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
