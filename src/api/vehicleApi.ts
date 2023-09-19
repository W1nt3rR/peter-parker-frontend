import { type AxiosInstance } from "axios";

export interface IVehicleData {
    registration: string;
    parkingSpaceGUID: string;
    guid: string;
}

export default class vehiclepi {
    axios: AxiosInstance;

    constructor(axios: AxiosInstance) {
        this.axios = axios;
    }

    async addVehicle(registration: string) {
        await this.axios.post("/Vehicle/AddVehicle", {
            Registration: registration,
        });
    }

    async removeVehicle(registration: string) {
        await this.axios.delete("/Vehicle/DeleteVehicle", {
            data: {
                Registration: registration,
            }
        });
    }

    async park(vehicleGUID: string, parkingSpaceGUID: string) {
        await this.axios.post("/Vehicle/ParkVehicle", {
            VehicleGUID: vehicleGUID,
            ParkingSpaceGUID: parkingSpaceGUID,
        });
    }

    async unpark(parkingSpaceGUID: string) {
        await this.axios.post("/Vehicle/UnparkVehicle", {
            ParkingSpaceGUID: parkingSpaceGUID,
        });
    }
}
