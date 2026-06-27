const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://roxyez.vercel.app",
    "https://roxannaezenekwe600.com",
    "https://www.roxannaezenekwe600.com",
  ],
  credentials: true,
}));

app.use(express.json());

// Routes
app.use("/api/auth", require("./Routes/authRoutes"));
app.use("/api/blogs", require("./Routes/blogRoutes"));
app.use("/api/books", require("./Routes/bookRoutes"));
app.use("/api/contact", require("./Routes/contactRoutes"));
app.use("/api/upload", require("./Routes/uploadRoutes"))
app.use("/api/lead-magnet", require("./Routes/leadMagnetRoutes"));

app.get("/", (req, res) => {
  res.send("RoxyEZ API running");
});

app.use((err, req, res, next) => {
  console.log("Global error:", err.message)
  res.status(500).json({ message: err.message })
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));