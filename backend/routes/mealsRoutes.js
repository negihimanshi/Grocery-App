const express = require("express");
const { searchMeals } = require("../controllers/mealsController");
const { protect } = require("../middleware/authMiddleware"); // Ensuring user authentication
const router = express.Router();

router.get("/search", protect, searchMeals); // Search meals based on grocery items

module.exports = router;
