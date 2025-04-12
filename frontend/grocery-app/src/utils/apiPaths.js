export const BASE_URL = "http://localhost:8080";

//utils.apiPaths.js
export const API_PATHS = {
    AUTH: {
        LOGIN: "/api/v1/auth/login",
        REGISTER: "/api/v1/auth/register",
        GET_USER_INFO: "/api/v1/auth/getUser",
    },
    DASHBOARD: {
        ADD_ITEM: "/api/v1/dashboard/add",
        GET_ALL_ITEMS: "/api/v1/dashboard/get",
        DELETE_ITEM: (itemId) => `/api/v1/dashboard/${itemId}`,
        DOWNLOAD_ITEMS: '/api/v1/dashboard/downloadexcel',
        // UPLOAD_RECEIPT: '/api/v1/dashboard/upload'
    },
    MEALS: {
        SEARCH_MEALS: "/api/v1/meals/search"
    }
};