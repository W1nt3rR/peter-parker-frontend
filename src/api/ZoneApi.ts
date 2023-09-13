import { type AxiosInstance } from "axios";

export default class ZoneApi {
    axios: AxiosInstance;

    constructor(axios: AxiosInstance) {
        this.axios = axios;
    }

    async getZones() {
        return await this.axios.get("/Zone/All");
    }

    async createZone(name: string, geoJson: object, color: string) {
        await this.axios.post("/Zone/Add", {
            Name: name,
            GeoJSON: geoJson,
            Color: color,
        });
    }
}
