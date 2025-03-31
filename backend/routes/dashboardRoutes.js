const express = require("express");
const {
    addItem,
    getAllItem,
    deleteItem,
    downloadItemExcel
} = require("../controllers/dashboardController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", protect, addItem);
router.get("/get", protect, getAllItem);
router.get("/downloadExcel", protect, downloadItemExcel);
router.delete("/:id", protect, deleteItem);

module.exports = router;