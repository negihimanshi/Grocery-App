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
import { LuPlus } from "react-icons/lu";
import Modal from "../../components/Modal";
import AddItemForm from "../../components/Dashboard/AddItemForm";
import toast from "react-hot-toast";
import DeleteAlert from "../../components/DeleteAlert";

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
  const [openAddItemModal, setOpenAddItemModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  // Get all item details 
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

  // Handle Add Item 
  const handleAddItem = async (itemData) => {
    // setOpenAddItemModal(true);
    const {name, category, quantity, unit, purchaseDate, expirationDate, consumed, wasteReason} = itemData;

    // Validation Checks 
    if (!name.trim()){
      toast.error("Source is required.");
      return;
    }

    if (!category.trim()){
      toast.error("Category is required.");
      return;
    }

    if (!quantity || isNaN(quantity) || Number(quantity) <= 0){
      toast.error("Amount should be valid number greater than 0.")
      return;
    }

    if (!unit.trim()){
      toast.error("Unit is required.");
      return;
    }

    if (!purchaseDate){
      toast.error("Date is required.");
      return;
    }

    if (!expirationDate){
      toast.error("Date is required.");
      return;
    }

    if (!consumed.trim()){
      toast.error("Comsumed status is required.");
      return;
    }

    if (!wasteReason.trim()){
      toast.error("Waste status is required.");
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.DASHBOARD.ADD_ITEM, {
        name,
        category,
        quantity,
        unit,
        purchaseDate,
        expirationDate,
        consumed,
        wasteReason,
      });

      setOpenAddItemModal(false);
      toast.success("Item added successfully");
      fetchDashboardData();
    } catch (error) {
      console.log(
        "Error adding item",
        error.response?.data?.message || error.message
      );
    }

  };

  // Delete Item 
  const deleteItem = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.DASHBOARD.DELETE_ITEM(id));

      setOpenDeleteAlert(prev => ({ ...prev, show: false, data: null }));
      toast.success("Item details deleted successfully");
      fetchDashboardData();
    } catch (error){
      console.error(
        "Error deleting income: ",
        error.response?.data?.message || error.message
      );
    }
  };

  // Handle download item details 
  const handleDownloadItemDetails = () => {};


  useEffect(() => {
    fetchDashboardData();
  }, []);



  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="px-5 md:px-10 lg:px-16 py-6">
        <div className="grid grid-cols-4">
        <div className="text-2xl col-span-3 text-gray-800 mr-9 mb-3">Items</div>
        <button className="flex items-center sm:gap-4 text-1xl sm:text-[15px] text-white bg-primary py-3 px-6 rounded-lg hover:hover:bg-violet-600" onClick={() => setOpenAddItemModal(true)}>
          <LuPlus /> Add Item</button>
        </div>
        <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
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
                onDeleteItem = {() => {
                  console.log("Delete button clicked for item:", item._id); // Debugging log
                  setOpenDeleteAlert({ show: true, data: item._id });
                }}
              />
            ))
          ) : (
            <p>No items found.</p>
          )}
        </div>
        <Modal
          isOpen={openAddItemModal}
          onClose={() => setOpenAddItemModal(false)}
          title="Add Item"
          >
            <AddItemForm onAddItem={handleAddItem} />
          </Modal>
        
        <Modal 
          isOpen={openDeleteAlert.show}
          onClose={()=> setOpenDeleteAlert({ show: false, data: null})}
          title="Delete Item"
        >
          <DeleteAlert 
            content = "Are you sure you want to delete this item?"
            onDelete={() => {
              console.log("Delete button inside modal clicked!"); // Debugging log
              deleteItem(openDeleteAlert.data);
            }}
          />
        </Modal>
      </div>

    </DashboardLayout>
  );
};

export default Home;
