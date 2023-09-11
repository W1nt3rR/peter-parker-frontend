import { useStore } from "@/stores/store";
import { type AxiosInstance } from "axios";
import Cookies from "js-cookie";
import jwt_decode, { type JwtPayload } from "jwt-decode";

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

export default class AuthApi {
    axios: AxiosInstance;

    constructor(axios: AxiosInstance) {
        this.axios = axios;
    }

    async login(email: string, password: string) {
        const response = await this.axios.post("/User/LogIn", { email, password });

        this.setSession(response.data);

        await this.requestUserData();

        console.log(response.data);
    }

    setSession(token: string) {
        const tokenDecoded: JwtPayload = jwt_decode(token);

        Cookies.set("token", token, {
            expires: new Date((tokenDecoded.exp as number) * 1000),
        });

        this.setHeaders(token);
    }

    logout() {
        // return this.axios.post('/auth/logout');
    }

    async register(registerData: IRegisterData) {
        const response = await this.axios.post("/User/Register", registerData);

        console.log(response.data);
        
        this.setSession(response.data);

        await this.requestUserData();
    }

    setHeaders(token: string) {
        this.axios.defaults.headers.common["Authorization"] = `bearer ${token}`;
    }

    async requestUserData(): Promise<IUserData> {
        const response = await this.axios.get("/User/Data");

        const store = useStore();
        store.user = response.data;

        console.log("USER", response.data);

        return response.data;
    }
}
