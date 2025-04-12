import React, { createContext, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Function to update user data 
    const updateUser = (userData) => {
        setUser(userData);
    };

    // Function to clear user data (e.g. on logoout)
    const clearUser = () => {
        console.log("Clear user called");
        setUser(null);
    };

    return (
        <UserContext.Provider
            value={{
                user,
                updateUser,
                clearUser,
            }}
        >
            { children }
        </UserContext.Provider>
    );
}
 
export default UserProvider;