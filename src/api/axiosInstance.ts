import config from "@/config";
import axios from "axios";
import { type AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
    baseURL: config.apiBaseURL,
});

export default axiosInstance;
