import AuthApi from "./authApi";
import InstructorApi from "./instructorApi";
import server from "./server";
import { type AxiosInstance } from "axios";
import Cookies from "js-cookie";

export default class PeterParkerClient {
    axios: AxiosInstance;
    auth: AuthApi;
    instructorAPI: InstructorApi;

    constructor() {
        this.axios = server;
        this.auth = new AuthApi(this.axios);
        this.instructorAPI = new InstructorApi(this.axios);
    }

    init() {
        const token = Cookies.get("token");

        if (token) {
            this.auth.setHeaders(token);
            this.auth.requestUserData();
        }
    }
}
