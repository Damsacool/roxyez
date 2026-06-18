const express = require("express")
const router = express.Router()
const { upload } = require("../config/cloudinary")
const { uploadImage } = require("../Controller/uploadController")
const protect = require("../Middleware/authMiddleware")

router.post("/", protect, upload.single("image"), uploadImage)

module.exports = router