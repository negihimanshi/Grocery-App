import React, { useState } from 'react';
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri"; 

const MealCard = ({ icon, label, mealData }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Extract and filter non-empty ingredients
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = mealData[`strIngredient${i}`];
    const measure = mealData[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push(`${measure} ${ingredient}`.trim());
    }
  }

  return (
    <div className="flex flex-col bg-white p-4 rounded-2xl shadow-md border border-gray-200/50 w-full">
      {/* Top Section */}
      <div className="flex lg:flex-row items-center justify-between gap-6">
        {/* Icon */}
        <div className="flex items-center justify-center w-30 h-30 text-3xl text-primary m-[20px]">
        <img
            src={mealData.strMealThumb}
            alt={label}
            className="w-full h-full object-cover rounded-4xl"
          />
        </div>

        {/* Meal Name */}
        <div className="flex-1">
          <span className="text-[24px] font-semibold">{label}</span>
        </div>

        {/* Expand Button */}
        <button 
          onClick={() => setIsExpanded(!isExpanded)} 
          className="text-gray-500 text-[30px] cursor-pointer"
        >
          {isExpanded ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
        </button>
      </div>

      {/* Ingredients List */}
      <div className="mt-3 text-gray-600">
        <strong>Ingredients:</strong>
        <ul className="list-disc pl-6 mt-1">
          {ingredients.map((ing, index) => (
            <li key={index} className="text-[16px]">{ing}</li>
          ))}
        </ul>
      </div>

      {/* Instructions - Show Only When Expanded */}
      {isExpanded && (
        <div className="mt-4 p-3 border-t border-gray-300">
          <p className="text-gray-700 text-[16px]">
            <strong>Instructions:</strong> {mealData.strInstructions}
          </p>
        </div>
      )}
    </div>
  );
};

export default MealCard;
