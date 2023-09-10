import config from "@/config";
import axios from "axios";
import { type AxiosInstance } from "axios";

const server: AxiosInstance = axios.create({
    baseURL: config.apiBaseURL,
});

export default server;
