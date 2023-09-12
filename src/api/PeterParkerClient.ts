import AuthApi from "./authApi";
import InspectorApi from "./inspectorApi";
import axiosInstance from "./axiosInstance";
import { type AxiosInstance } from "axios";
import Cookies from "js-cookie";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import PPException, { EErrors } from "@/lib/PPException";

export default class PeterParkerClient {
    axios: AxiosInstance;
    auth: AuthApi;
    inspectorAPI: InspectorApi;

    constructor() {
        this.axios = axiosInstance;
        this.auth = new AuthApi(this.axios);
        this.inspectorAPI = new InspectorApi(this.axios);

        createAuthRefreshInterceptor(
            this.axios,
            async (failedRequest: any) => {
                const tokens = await this.auth.requestNewTokens();
                failedRequest.response.config.headers["Authorization"] = "bearer " + tokens?.token;
            },
            {
                statusCodes: [401, 403],
            }
        );
    }

    async init() {
        const refreshToken = Cookies.get("refresh-token");

        if (refreshToken) {
            this.auth.refreshToken = refreshToken;
            await this.auth.requestNewTokens();
            await this.auth.requestUserData();
        } else {
            throw new PPException(null, EErrors.NO_REFRESH_TOKEN);
        }
    }
}
