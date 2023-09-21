import { type AxiosInstance } from "axios";

export default class InspectorApi {
    axios: AxiosInstance;

    constructor(axios: AxiosInstance) {
        this.axios = axios;
    }

    async makeInspector(email: string) {
        await this.axios.post("/User/MakeInspector", {
            Email: email,
        });
    }

    async removeInspector(email: string) {
        await this.axios.post("/User/RevokeInspector", {
            Email: email,
        });
    }

    async makeAdmin(email: string) {
        await this.axios.post("/User/MakeAdmin", {
            Email: email,
        });
    }

    async removeAdmin(email: string) {
        await this.axios.post("/User/RevokeAdmin", {
            Email: email,
        });
    }
}
