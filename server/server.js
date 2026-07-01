const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
    res.send("Employee Management API is running...");
});

const PORT = process.env.PORT || 5000;

// Start Server
const startServer = async () => {
    try {
        // Connect to MongoDB first
        await connectDB();

        // Start Express only after DB is connected
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error("Failed to start server");
        process.exit(1);
    }
};

startServer();