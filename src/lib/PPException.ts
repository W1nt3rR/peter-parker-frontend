import config, { EEnvironment } from "@/config";

export enum EErrors {
    AUTH_ERROR = "Authentication error",
    REGISTRATION_ERROR = "Registration error",
    LOGIN_ERROR = "Login error",
    NO_REFRESH_TOKEN = "No refresh token",
}

export default class PPException {
    error: any;
    backendErrorMessage: string;
    message: string;

    constructor(error: any, message: EErrors) {
        this.error = error;
        this.backendErrorMessage = error.response.data;
        this.message = message;

        if (config.environment === EEnvironment.DEV) {
            this.printError();
        }
    }

    printError() {
        console.log(this.message, this.backendErrorMessage, this.error);
    }
}
