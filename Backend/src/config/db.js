import mongoose from "mongoose";
import { seedAdmin } from "./seed.js";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            // Add these options to fix potential SSL handshake issues
            tls: true,
            tlsAllowInvalidCertificates: true, // Only for development/debugging if cert chain issues exist
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        await seedAdmin();
    } catch (error) {
        console.error(`Error : ${error.message}`);
        process.exit(1);
    }
};
