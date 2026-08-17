require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const profileRoutes = require("./routes/profile");
const projectRoutes = require("./routes/project");

const app = express();

// MongoDB bağlantısı
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Test
app.get("/test", (req, res) => {
  res.json({
    message: "Backend çalışıyor"
  });
});

// API Routes
app.use("/api/profiles", profileRoutes);
app.use("/api/projects", projectRoutes);

// Port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor`);
});