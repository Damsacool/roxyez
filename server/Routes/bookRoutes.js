const express = require("express");
const router = express.Router();
const {
  getAllBooks,
  getAllLiveBooks,
  createBook,
  updateBook,
  deleteBook,
} = require("../Controller/bookController");
const protect = require("../Middleware/authMiddleware");

router.get("/", getAllBooks);
router.get("/live", getAllLiveBooks);
router.post("/", protect, createBook);
router.put("/:id", protect, updateBook);
router.delete("/:id", protect, deleteBook);

module.exports = router;