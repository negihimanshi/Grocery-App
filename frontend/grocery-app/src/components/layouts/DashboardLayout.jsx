import React, { useContext } from 'react';
import { UserContext } from "../../context/UserContext";
import Navbar from './Navbar';
import SideMenu from "./SideMenu";

const DashboardLayout = ({ children, activeMenu }) => {
    const { user } = useContext(UserContext);
    // console.log("User Context:", user);

  return (
    <div className=''>
        <Navbar activeMenu = {activeMenu} />

        {user && (
            <div className='flex'>
                <div className="hidden lg:block">
                    <SideMenu activeMenu={activeMenu} />
                </div>

                <div className='flex-grow mx-5'>{children}</div>
            </div>
        )}
    </div>
  );
};

export default DashboardLayout