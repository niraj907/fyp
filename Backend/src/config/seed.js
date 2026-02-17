import { User } from "../models/auth.model.js";

export const seedAdmin = async () => {
    console.log("🔍 Checking for admin user...");
    try {
        const adminExists = await User.findOne({ role: "admin" });
        if (!adminExists) {
            await User.create({
                name: "System Admin",
                email: "admin@gmail.com",
                password: "admin123", // You should change this after first login
                confirmPassword: "admin123",
                role: "admin"
            });
            console.log("✅ Admin user seeded: admin@gmail.com / admin123");
        } else {
            console.log("ℹ️ Admin user already exists");
            console.log("Admin user: ", adminExists);
        }
    } catch (error) {
        console.error("❌ Admin seeding failed:", error.message);
    }
};
