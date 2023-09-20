import PPException, { EErrors } from "@/lib/PPException";
import { type AxiosInstance } from "axios";

export default class SubscriptionApi {
    axios: AxiosInstance;

    constructor(axios: AxiosInstance) {
        this.axios = axios;
    }

    async subscribe(subscriptionType: string) {
        try {
            await this.axios.post("/Subscription/Subscribe", {
                Type: subscriptionType,
            });
        } catch (error) {
            throw new PPException(error, EErrors.SUBSCRIPTION_FAILED);
        }
    }

    async unsubscribe() {
        try {
            await this.axios.post("/Subscription/Unsubscribe");
        } catch (error) {
            throw new PPException(error, EErrors.SUBSCRIPTION_FAILED);
        }
    }

    async getPrices() {
        const response = await this.axios.get("/Subscription/GetPrices");
        return response.data;
    }
}
