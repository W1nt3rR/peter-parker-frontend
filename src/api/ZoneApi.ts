import { type AxiosInstance } from "axios";
import type { IVehicleData } from "./vehicleApi";

export enum EZoneColors {
    ZONE_COLOR = "#FF0000",
    GARAGE_AREA_COLOR = "#00FF00",
    UNDERGROUND_AREA_COLOR = "#FFFF00",
    LOT_AREA_COLOR = "#0000FF",
}

export enum EAreaTypes {
    GARAGE = "garage",
    UNDERGROUND = "underground",
    LOT = "lot",
}

export interface IZoneData {
    guid: string;
    geoJSON: object;
    name: string;
    parkingAreas: Array<IAreaData>;
}

export interface IAreaData {
    name: string;
    guid: string;
    type: EAreaTypes;
    address: string;
    geoJSON: object;
    workingHours: string;
    parkingSpaces: Array<IParkingSpaceData>;
}

export interface IParkingSpaceData {
    guid: string;
    vehicle: IVehicleData | null;
    number: number;
}

export interface IAddAreaData {
    name: string;
    type: string;
    address: string;
    geoJSON: object | null | string;
    workingHours: string;
    numberOfSpaces: string;
}

export default class ZoneApi {
    axios: AxiosInstance;

    constructor(axios: AxiosInstance) {
        this.axios = axios;
    }

    async all(): Promise<Array<IZoneData>> {
        const response = await this.axios.get("/Zone/All");

        const zones = response.data;

        zones.forEach((zone: any) => {
            zone.geoJSON = JSON.parse(zone.geoJSON);

            zone.parkingAreas.forEach((area: any) => {
                area.geoJSON = JSON.parse(area.geoJSON);
            })
        });

        return zones;
    }

    async create(geoJson: object) {
        await this.axios.post("/Zone/Add", {
            GeoJSON: JSON.stringify(geoJson),
        });
    }

    async update(zone: IZoneData) {
        await this.axios.patch("/Zone/Update", {
            GUID: zone.guid,
            Name: zone.name,
            GeoJSON: JSON.stringify(zone.geoJSON),
        });
    }

    async delete(guid: string) {
        await this.axios.delete("/Zone/Delete", {
            data: {
                guid: guid,
            }
        });
    }

    async addArea(zoneGuid: string, area: IAddAreaData) {
        area.geoJSON = JSON.stringify(area.geoJSON);
        await this.axios.post("/Zone/AddArea", {
            ZoneGUID: zoneGuid,
            ParkingArea: area,
        });
    }
}
