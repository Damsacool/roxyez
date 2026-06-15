const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./Routes/authRoutes"));
app.use("/api/blogs", require("./Routes/blogRoutes"));
app.use("/api/books", require("./Routes/bookRoutes"));
app.use("/api/contact", require("./Routes/contactRoutes"));

app.get("/", (req, res) => {
  res.send("RoxyEZ API running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));