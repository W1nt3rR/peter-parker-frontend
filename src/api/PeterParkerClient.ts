import AuthApi from "./authApi";
import server from "./server";
import { type AxiosInstance } from "axios";


export default class PeterParkerClient {

    axios: AxiosInstance;
    auth: AuthApi;

    constructor() {
        this.axios = server;
        this.auth = new AuthApi(this.axios);
    }

    init() {
        // get token from cookies
        // set token in axios header

    }

}
