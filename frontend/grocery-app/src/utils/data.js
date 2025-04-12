// import {
//     LuLayoutDashboard,
//     LuHandCoins,
//     LuWalletMinimal,
//     LuLogOut,
// } from "react-icons/lu";

import { LuLogOut } from "react-icons/lu";
import { IoFastFoodOutline } from "react-icons/io5";
import { MdOutlineLocalGroceryStore,  
    MdOutlinePeopleAlt, 
    MdOutlineAnalytics } from "react-icons/md";

export const SIDE_MENU_DATA = [
    {
        id: "01",
        label: "Dashboard",
        icon: MdOutlineLocalGroceryStore,
        path: "/dashboard"
    },
    {
        id: "02",
        label: "Meals",
        icon: IoFastFoodOutline,
        path: "/meals"
    },
    {
        id: "03",
        label: "Community",
        icon: MdOutlinePeopleAlt,
        path: "/community"
    },
    {
        id: "04",
        label: "Analytics",
        icon: MdOutlineAnalytics,
        path: "/analytics"
    },
    {
        id: "06",
        label: "Logout",
        icon: LuLogOut,
        path: "/login"
    }
]