import axios from "axios";
import i18n from "../i18next";

const AuthAxiosInstance = axios.create({
    baseURL: 'https://knowledgeshop.runasp.net/api/',
});

AuthAxiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("AccessToken");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers["Accept-Language"] = i18n.language;

    return config;
});

export default AuthAxiosInstance;