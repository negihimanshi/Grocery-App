const xlsx = require("xlsx");
const GroceryItem = require("../models/Grocery");


// Add Item
exports.addItem = async (req, res) => {
    const userId = req.user.id;

    try {
        const { name, category, quantity, unit, purchaseDate, expirationDate, consumed, wasteReason} = req.body;

        // Validation: Check for missing fields
        if (!name || !category || !quantity || !unit || !expirationDate) {
            return res.status(400).json({ message: "All fields are required"});
        }

        const newItem = new GroceryItem({
            userId,
            name,
            category,
            quantity,
            unit,
            purchaseDate: purchaseDate ? new Date(purchaseDate) : new Date(), // ✅ Fixed
            expirationDate: new Date(expirationDate), // Ensure it's a valid Date
            consumed: consumed || false, // Default to false if not provided
            wasteReason: wasteReason || "Not Wasted", // Default reason
        });

        await newItem.save();
        res.status(200).json(newItem);
    } catch (error) {
        console.error("Error adding grocery item:", error); // Debugging
        res.status(500).json({ message: "Server Error"});
    }
}

// Get All Item
exports.getAllItem = async (req, res) => {
    const userId = req.user.id;

    try {
        const item = await GroceryItem.find({ userId }).sort({ expirationDate: -1 });
        res.json(item);
    } catch (error){
        res.status(500).json({ message: "Server Error"});
    }
}

// Delete Item
exports.deleteItem = async (req, res) => {
    try {
        await GroceryItem.findByIdAndDelete(req.params.id);
        res.json({ message: "Income deleted successfully" });
    } catch (error){
        res.status(500).json({ message: "Server Error" });
    }
}

// Download Excel
exports.downloadItemExcel = async (req, res) => {
    const userId = req.user.id;
    try {
        const groceryItem = await GroceryItem.find({ userId }).sort({ expirationDate: -1});

        // Prepare data for Excel 
        const data = groceryItem.map((item) => ({
            Name: item.name,
            Category: item.category,
            Quantity: item.quantity,
            Unit: item.unit,
            PurchaseDate: item.purchaseDate,
            ExpirationDate: item.expirationDate,
            Consumed: item.consumed,
            WasteReason: item.wasteReason,
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Grocery Items");
        xlsx.writeFile(wb, 'grocery_details.xlsx');
        res.download('grocery_details.xlsx');
    } catch(error) {
        res.status(500).json({ message: "Server Error"});
    }
};

//Logic for expiring items on top
//Descending order of expiry date
//Dard red if already expired
//Red if expiring