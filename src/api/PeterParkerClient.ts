import { type AxiosInstance } from "axios";
import Cookies from "js-cookie";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import PPException, { EErrors } from "@/lib/PPException";

import axiosInstance from "./axiosInstance";
import AuthApi from "./authApi";
import InspectorApi from "./inspectorApi";
import ZoneApi from "./ZoneApi";
import VehicleApi from "./vehicleApi";
import SubscriptionApi from "./SubscriptionApi";

export default class PeterParkerClient {
    axios: AxiosInstance;
    authAPI: AuthApi;
    inspectorAPI: InspectorApi;
    zoneAPI: ZoneApi;
    vehicleApi: VehicleApi;
    subscriptionApi: SubscriptionApi;

    constructor() {
        this.axios = axiosInstance;
        this.authAPI = new AuthApi(this.axios);
        this.inspectorAPI = new InspectorApi(this.axios);
        this.zoneAPI = new ZoneApi(this.axios);
        this.vehicleApi = new VehicleApi(this.axios);
        this.subscriptionApi = new SubscriptionApi(this.axios);

        createAuthRefreshInterceptor(
            this.axios,
            async (failedRequest: any) => {
                const tokens = await this.authAPI.requestNewTokens();
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
            this.authAPI.refreshToken = refreshToken;
            await this.authAPI.requestNewTokens();
            await this.authAPI.requestUserData();
        }
    }
}
