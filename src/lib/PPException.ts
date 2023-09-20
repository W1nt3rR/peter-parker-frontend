import config, { EEnvironment } from "@/config";

export enum EErrors {
    AUTH_ERROR = "Authentication error",
    REGISTRATION_ERROR = "Registration error",
    LOGIN_ERROR = "Login error",
    NO_REFRESH_TOKEN = "No refresh token",
    SERVER_NOT_AVAILABLE = "Server not available",
    SUBSCRIPTION_FAILED = "Subscription failed",
    PASS_ERROR = "PASS error",
}

export interface IBackendError {
    Message: string;
    Success: boolean;
}

export default class PPException {
    error: any;
    backendErrorObj: IBackendError | null;
    message: string;

    constructor(error: any, message: EErrors) {
        this.error = error;
        this.backendErrorObj = error?.response?.data;
        this.message = message;

        if (config.environment === EEnvironment.DEV) {
            this.printError();
        }
    }

    printError() {
        console.log(this.message, this.backendErrorObj, this.error);
    }
}
