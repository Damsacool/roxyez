const express = require("express");
const router = express.Router();
const {
  getAllBooks,
  createBook,
  updateBook,
  deleteBook,
} = require("../Controller/bookController");
const protect = require("../Middleware/authMiddleware");

router.get("/", getAllBooks);
router.post("/", protect, createBook);
router.put("/:id", protect, updateBook);
router.delete("/:id", protect, deleteBook);

module.exports = router;