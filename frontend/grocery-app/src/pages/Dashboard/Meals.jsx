import React, { useEffect, useState } from 'react'
import { useUserAuth } from '../../hooks/useUserAuth'
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import MealCard from '../../components/Cards/MealCard';


const Meals = () => {
  useUserAuth();

  const [mealsData, setMealsData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get all meals 
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
  
    return () => {}
  }, [])
  

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
            mealsData.map((recipe) => (
              // console.log(item)
              <MealCard
                key={recipe.idMeal}
                icon={<img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-12 h-12 rounded-full" />}
                label={recipe.strMeal}
                mealData={recipe}  // ✅ Pass the entire recipe object
                color="bg-primary"
              />
            ))
          ) : (
            <p>No meals found.</p>
          )}
        </div>
      </div>

    </DashboardLayout>
  )
}

export default Meals