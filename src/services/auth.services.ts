import { authKey } from "@/constants/authKey";
import { instance as axiosInstance } from "@/helpers/axios/axiosInstance";
import { decodedToken } from "@/utils/jwt";
import {
    getFromLocalStorage,
    removeFromLocalStorage,
    setToLocalStorage,
} from "@/utils/localStorage";

export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
    return setToLocalStorage(authKey, accessToken);
};

export const getUserInfo = () => {
    const authToken = getFromLocalStorage(authKey);

    if (authToken) {
        const decodedData: any = decodedToken(authToken);
        return {
            ...decodedData,
            role: decodedData?.role?.toLowerCase(),
        };
    }

    return null;
};

export const isLoggedIn = () => {
    const authToken = getFromLocalStorage(authKey);

    if (authToken) {
        return !!authToken;
    }
};

export const removeUser = () => {
    return removeFromLocalStorage(authKey);
};

export const generateNewAccessToken = async () => {
    return await axiosInstance({
        url: `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
    });
};
