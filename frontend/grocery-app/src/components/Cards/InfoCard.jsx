import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";


const InfoCard = ({ icon, label, value, date }) => {
  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "No Expiry";

      const handleDelete = async () => {
      }

  return (
    <div className="flex lg:flex-row items-center justify-between gap-6 bg-white p-3 rounded-2xl shadow-md border border-gray-200/50 w-full lg:gap-15">
      {/* Icon */}
      <div className="flex items-center justify-center w-16 h-16 text-3xl text-primary">
        {icon}
      </div>

      {/* Details */}
      <div className="flex-1 sm:grid sm:grid-cols-4">
        <span className="text-[30px] col-span-3">{label}</span>
        <div className="sm:text-[20px]  text-[15px] col-span-3 text-gray-500 font-medium">{value}</div>
        {date && (
          <p
            className={`sm:text-[20px]  text-xs  ${
              new Date(date) < new Date() ? "text-red-500" : "text-gray-400"
            }`}
          >
            Expires: {formattedDate}
          </p>
        )}
      </div>
      <button onClick={handleDelete}  className="text-gray-500 text-[30px] mr-5 cursor-pointer">
            <RiDeleteBin6Line />
        </button>
    </div>
  );
};

export default InfoCard;
