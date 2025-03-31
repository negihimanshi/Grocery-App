const mongoose = require("mongoose");

const GroceryItemSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    name: { type: String, required: true }, // Item name (e.g., Milk, Bread)
    category: { type: String, enum: ["Vegetables", "Fruits", "Dairy", "Meat", "Grains", "Beverages", "Others"], required: true },
    quantity: { type: Number, required: true, min: 1 }, // Amount (e.g., 2 kg, 1 pack)
    unit: { type: String, enum: ["kg", "g", "liters", "ml", "pieces"], required: true }, // Measurement unit
    purchaseDate: { type: Date, default: Date.now }, // When it was bought
    expirationDate: { type: Date, required: true }, // Best-before date
    consumed: { type: Boolean, default: false }, // Whether it's been used
    wasteReason: { 
        type: String, 
        enum: ["Expired", "Spoiled", "Unused", "Not Wasted"], 
        default: function () { return this.consumed ? "Not Wasted" : "Unused"; } // ✅ Dynamic Default 
    }
});

module.exports = mongoose.model("GroceryItem", GroceryItemSchema)