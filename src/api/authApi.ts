import config from "@/config";
import PPException, { EErrors } from "@/lib/PPException";
import router from "@/router";
import { useStore } from "@/stores/store";
import axios, { type AxiosInstance } from "axios";
import Cookies from "js-cookie";

export interface IUserData {
    email: string;
    firstName: string;
    lastName: string;
}

export interface IRegisterData {
    email: string;
    password: string;
    passwordConfirmation: string;
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
            const response = await this.axios.post("/User/LogIn", { email, password });

            this.setTokens(response.data as IAuthTokens);

            await this.requestUserData();
        } catch (error) {
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
        this.refreshToken = null;
        router.push("/login");
    }

    async register(registerData: IRegisterData) {
        try {
            const response = await this.axios.post("/User/Register", registerData);

            this.setTokens(response.data as IAuthTokens);

            await this.requestUserData();
        } catch (error) {
            throw new PPException(error, EErrors.REGISTRATION_ERROR);
        }
    }

    setTokens(tokens: IAuthTokens) {
        this.refreshToken = tokens.refreshToken;
        this.setAuthHeader(tokens.token);
        this.storeRefreshToken(tokens.refreshToken);
    }

    setAuthHeader(accessToken: string) {
        this.axios.defaults.headers.common["Authorization"] = `bearer ${accessToken}`;
    }

    async requestNewTokens() {
        if (!this.refreshToken) {
            throw new PPException(null, EErrors.NO_REFRESH_TOKEN);
        }

        try {
            const response = await axios.post(`${config.apiBaseURL}/User/TokenRefresh`, null, {
                headers: {
                    "X-Pp-Refresh-Token": this.refreshToken,
                },
            });

            this.setTokens(response.data as IAuthTokens);

            return response.data as IAuthTokens;
        } catch (error) {
            this.logout();
        }
    }

    async requestUserData(): Promise<IUserData> {
        const response = await this.axios.get("/User/Data");

        // Store user data in store
        const store = useStore();
        store.user = response.data;

        return response.data;
    }
}
