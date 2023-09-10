import { useStore } from "@/stores/store";
import { type AxiosInstance } from "axios";

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
        // store token as session in localstorage
        localStorage.setItem("token", token);
        this.axios.defaults.headers.common["Authorization"] = `bearer ${token}`;
    }

    logout() {
        // return this.axios.post('/auth/logout');
    }

    async register(username: string, password: string) {
        return await this.axios.post("/User/Register", { username, password });
    }

    async requestUserData() {
        const response = await this.axios.get("/User/Data");

        const store = useStore();
        store.user = response.data;

        console.log("USER", response.data);

        return response.data;
    }
}
