const axios = require("axios");
const GroceryItem = require("../models/Grocery");

const MEAL_API_URL = "https://www.themealdb.com/api/json/v1/1";

exports.searchMeals = async (req, res) => {
    try {
        const userId = req.user.id;

        // Fetch user's grocery items
        const groceryItems = await GroceryItem.find({ userId }).sort({ expirationDate: 1 });
        if (!groceryItems.length) {
            return res.status(400).json({ message: "No grocery items found" });
        }

        // Extract ingredient names
        const ingredients = groceryItems.map(item => item.name);

        // Fetch meals for all ingredients concurrently
        const mealRequests = ingredients.map(ingredient =>
            axios.get(`${MEAL_API_URL}/filter.php`, { params: { i: ingredient } })
        );

        // Wait for all API responses
        const mealResponses = await Promise.all(mealRequests);

        // Extract meal IDs from responses
        const mealIds = mealResponses.flatMap(response => response.data.meals || []).map(meal => meal.idMeal);

        // Remove duplicates
        const uniqueMealIds = [...new Set(mealIds)];

        // Fetch full details for each meal
        const fullMealRequests = uniqueMealIds.map(id =>
            axios.get(`${MEAL_API_URL}/lookup.php`, { params: { i: id } })
        );

        // Wait for all full meal responses
        const fullMealResponses = await Promise.all(fullMealRequests);

        // Extract full meal details
        const meals = fullMealResponses.map(response => response.data.meals[0]);

        res.status(200).json(meals);

    } catch (error) {
        console.error("Error fetching meals:", error.message);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
