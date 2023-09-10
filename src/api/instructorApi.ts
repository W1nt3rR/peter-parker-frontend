import { type AxiosInstance } from "axios";

export default class InstructorApi {
    axios: AxiosInstance;

    constructor(axios: AxiosInstance) {
        this.axios = axios;
    }

    async makeInstructor(email: string) {
        await this.axios.post("/User/MakeInstructor", {
            Email: email,
        });
    }

    async removeInstructor(email: string) {
        await this.axios.post("/User/RevokeInstructor", {
            Email: email,
        });
    }
}
