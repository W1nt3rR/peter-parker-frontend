import PPException, { EErrors } from "@/lib/PPException";
import { type AxiosInstance } from "axios";

export default class SubscriptionApi {
    axios: AxiosInstance;

    constructor(axios: AxiosInstance) {
        this.axios = axios;
    }

    async add(hours: number, zoneGUIDs: Array<string>) {
        try {
            await this.axios.post("/Pass/Add", {
                Hours: hours,
                ZoneGUIDs: zoneGUIDs,
            });
        } catch (error) {
            throw new PPException(error, EErrors.PASS_ERROR);
        }
    }
}
