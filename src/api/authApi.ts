import config from "@/config";
import PPException, { EErrors } from "@/lib/PPException";
import useStore from "@/stores/store";
import axios, { type AxiosInstance } from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import type { IVehicleData } from "./vehicleApi";

export interface IUserData {
    email: string;
    firstName: string;
    lastName: string;
    homeAddress: string;
    subscription: string;
    vehicles: Array<IVehicleData>;
    tickets: Array<object>;
}

export interface IUserUpdateData {
    firstName?: string;
    lastName?: string;
    homeAddress?: string;
    password?: string;
}

export interface IRegisterData {
    email: string;
    password: string;
    homeAddress: string;
    firstName: string;
    lastName: string;
}

export interface IAuthTokens {
    token: string;
    refreshToken: string;
}

export default class AuthApi {
    axios: AxiosInstance;
    refreshToken: string | null = null;

    constructor(axios: AxiosInstance) {
        this.axios = axios;
    }

    async login(email: string, password: string) {
        try {
            const response = await axios.post(`${config.apiBaseURL}/User/LogIn`, { email, password });

            this.setTokens(response.data as IAuthTokens);

            await this.requestUserData();
        } catch (error: any) {
            throw new PPException(error, EErrors.LOGIN_ERROR);
        }
    }

    storeRefreshToken(refreshToken: string) {
        Cookies.set("refresh-token", refreshToken, {
            expires: new Date().setDate(new Date().getDate() + 7),
        });
    }

    logout() {
        Cookies.remove("refresh-token");
        const store = useStore();
        store.user = null;
        store.userDataFromToken = null;
        this.refreshToken = null;
    }

    async register(registerData: IRegisterData) {
        try {
            const response = await axios.post(`${config.apiBaseURL}/User/Register`, registerData);

            console.log("REGISTER RESPONSE", response);
            

            this.setTokens(response.data as IAuthTokens);

            await this.requestUserData();
        } catch (error) {
            throw new PPException(error, EErrors.REGISTRATION_ERROR);
        }
    }

    setTokens(tokens: IAuthTokens) {
        this.refreshToken = tokens.refreshToken;

        const store = useStore();
        store.userDataFromToken = jwt_decode(tokens.token);

        console.log(store.userDataFromToken);

        this.setAuthHeader(tokens.token);
        this.storeRefreshToken(tokens.refreshToken);
    }

    setAuthHeader(accessToken: string) {
        this.axios.defaults.headers.common["Authorization"] = `bearer ${accessToken}`;
    }

    async requestNewTokens() {
        if (!this.refreshToken) {
            return;
        }

        try {
            const response = await axios.post(`${config.apiBaseURL}/User/TokenRefresh`, null, {
                headers: {
                    "X-Pp-Refresh-Token": this.refreshToken,
                },
            });

            this.setTokens(response.data as IAuthTokens);

            return response.data as IAuthTokens;
        } catch (error: any) {
            if (!error.response) {
                throw new PPException(error, EErrors.SERVER_NOT_AVAILABLE);
            }
            if (error.response.status === 401) {
                // Invalid Token
                this.logout();
            }
        }
    }

    async requestUserData(): Promise<IUserData> {
        const response = await this.axios.get("/User/Data");

        // Store user data in store
        const store = useStore();
        store.user = response.data;

        return response.data;
    }

    async updateUserData(userData: IUserUpdateData) {
        await this.axios.put("/User/Update", userData);
        this.requestUserData();
    }
}
