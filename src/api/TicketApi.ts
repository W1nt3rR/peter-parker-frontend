import PPException, { EErrors } from "@/lib/PPException";
import { type AxiosInstance } from "axios";

export interface ICreateTicket {
    ParkingSpaceGuid: string;
    ZoneGuid: string;
    IssueReason: string;
}

export interface ISettleTicket {
    GUID: string;
    SettleReason: string;
}

export interface ITicketData {
    guid: string;
    paid: boolean;
    parkingSpaceGuid: string;
    zoneGuid: string;
    issueReason: string;
    issued: string;
    registration: string;
    fine: number;
}

export default class TicketApi {
    axios: AxiosInstance;

    constructor(axios: AxiosInstance) {
        this.axios = axios;
    }

    async all(): Promise<Array<ITicketData>> {
        const response = await this.axios.get("/Ticket/GetAllTickets");
        return response.data;
    }

    async create(data: ICreateTicket) {
        try {
            const response = await this.axios.post("/Ticket/AddTicket", data);
            return response.data;
        } catch (error) {
            throw new PPException(error, EErrors.TICKET_CREATE_FAILED);
        }
    }

    async settle(data: ISettleTicket) {
        try {
            const response = await this.axios.post("/Ticket/Settle", data);
            return response.data;
        } catch (error) {
            //
        }
    }
}
