import AuthApi from "./authApi";
import InstructorApi from "./instructorApi";
import server from "./server";
import { type AxiosInstance } from "axios";


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
        // get token from cookies
        // set token in axios header

    }

}
