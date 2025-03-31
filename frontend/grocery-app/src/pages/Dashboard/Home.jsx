import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import InfoCard from "../../components/Cards/InfoCard";

import { FaCarrot } from "react-icons/fa";
import { LuGrape } from "react-icons/lu";
import { PiCowBold } from "react-icons/pi";
import { GiMeat } from "react-icons/gi";
import { PiGrainsBold } from "react-icons/pi";
import { BiSolidDrink } from "react-icons/bi";
import { CiBowlNoodles } from "react-icons/ci";
import { IoFastFoodSharp } from "react-icons/io5";

const categoryIcons = {
  Vegetables: <FaCarrot />,
  Fruits: <LuGrape />,
  Dairy: <PiCowBold />,
  Meat: <GiMeat />,
  Grains: <PiGrainsBold />,
  Beverages: <BiSolidDrink />,
  Others: <IoFastFoodSharp />, 
};

const Home = () => {
  useUserAuth();

  const [dashboardData, setDashboardData] = useState([]);
  const [loading, setLoading] = useState(false);


  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_ALL_ITEMS);
      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchDashboardData();
  }, []);



  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="px-5 md:px-10 lg:px-16 py-6">
        <div className="grid grid-cols-4">
        <div className="text-2xl col-span-3 text-gray-800 mr-2">Items</div>
        <button className="bg-purple-400 border rounded-2xl">+ Add Item</button>
        </div>
        <hr class="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
          {loading ? (
            <p>Loading...</p>
          ) : dashboardData.length > 0 ? (
            dashboardData.map((item) => (
              <InfoCard
                key={item._id}
                icon={categoryIcons[item.category] || <CiBowlNoodles />}
                label={item.name}
                value={`${item.quantity} ${item.unit}`}
                color="bg-primary"
                date={item.expirationDate}
              />
            ))
          ) : (
            <p>No items found.</p>
          )}
        </div>
      </div>

    </DashboardLayout>
  );
};

export default Home;
