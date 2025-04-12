import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";


const InfoCard = ({ icon, label, value, date, onDeleteItem }) => {
  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "No Expiry";

    //   const handleDelete = async () => {
    //   }

  return (
    <div className="relative group col-span-4 flex lg:flex-row items-center justify-between gap-6 bg-white p-3 rounded-2xl shadow-md border border-gray-200/50 w-full lg:gap-15">
      {/* Icon */}
      <div className="flex items-center justify-center w-16 h-16 text-3xl text-primary">
        {icon}
      </div>

      {/* Details */}
      <div className="flex-1 sm:grid sm:grid-cols-4">
        <span className="text-[30px] col-span-2">{label}</span>
        <div className="sm:text-[20px]  text-[15px] col-span-2 sm:col-end-2 text-gray-500 font-medium">{value}</div>
        {date && (
          <p
            className={`sm:text-[20px]  text-xs sm:col-end-5 sm:col-span-2 ${
              new Date(date) < new Date() ? "text-red-500" : "text-gray-400"
            }`}
          >
            Expiry: {formattedDate}
          </p>
        )}
      </div>
      <button onClick={onDeleteItem}  className="text-gray-500 text-[30px] mr-5 cursor-pointer">
            <RiDeleteBin6Line className="absolute top-2 right-2 text-[30px] cursor-pointer hidden group-hover:block text-red-300 mr-5 mt-6"/>
        </button>
    </div>
  );
};

export default InfoCard;
