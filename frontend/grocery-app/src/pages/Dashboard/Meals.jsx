import React, { useEffect, useState } from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import MealCard from "../../components/Cards/MealCard";

const Meals = () => {
  useUserAuth();

  const [mealsData, setMealsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibleMeals, setVisibleMeals] = useState(10); // Show 10 meals initially

  // Fetch all meals
  const fetchMealsData = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(API_PATHS.MEALS.SEARCH_MEALS);
      if (response.data) {
        setMealsData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMealsData();
  }, []);

  // Load More function
  const loadMoreMeals = () => {
    setVisibleMeals((prev) => prev + 10); // Show 10 more meals on each click
  };

  return (
    <DashboardLayout activeMenu={"Meals"}>
      <div className="px-5 md:px-10 lg:px-16 py-6">
        <div className="grid grid-cols-4">
          <div className="text-2xl col-span-3 text-gray-800 mr-2">Recipes</div>
        </div>
        <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
          {loading ? (
            <p>Loading...</p>
          ) : mealsData.length > 0 ? (
            mealsData.slice(0, visibleMeals).map((recipe) => (
              <MealCard
                key={recipe.idMeal}
                icon={
                  <img
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                    className="w-12 h-12 rounded-full"
                  />
                }
                label={recipe.strMeal}
                mealData={recipe}
                color="bg-primary"
              />
            ))
          ) : (
            <p>No meals found.</p>
          )}
        </div>

        {/* Load More Button */}
        {visibleMeals < mealsData.length && (
          <div className="flex justify-center mt-6">
            <button
              onClick={loadMoreMeals}
              className="flex items-center justify-center sm:gap-4 text-1xl sm:text-[15px] text-white py-3 px-6 col-4 sm:col-5 rounded-lg bg-violet-500 shadow-lg shadow-purple-600/5 hover:bg-purple-600/15 hover:text-purple-600 transition duration-300"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Meals;
