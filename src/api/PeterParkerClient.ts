import AuthApi from "./authApi";
import InspectorApi from "./inspectorApi";
import server from "./server";
import { type AxiosInstance } from "axios";
import Cookies from "js-cookie";

export default class PeterParkerClient {
    axios: AxiosInstance;
    auth: AuthApi;
    inspectorAPI: InspectorApi;

    constructor() {
        this.axios = server;
        this.auth = new AuthApi(this.axios);
        this.inspectorAPI = new InspectorApi(this.axios);
    }

    init() {
        const token = Cookies.get("token");

        if (token) {
            this.auth.setHeaders(token);
            this.auth.requestUserData();
        }
    }
}
