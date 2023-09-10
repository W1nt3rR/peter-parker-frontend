import config, { EEnvironment } from "@/config";

enum EErrors {
    AUTH_ERROR = "Authentication error",
}

export default class ErrorHandler {
    backendErrorMessage: string;
    message: string;

    constructor(error: any, message: EErrors) {
        this.backendErrorMessage = error.response.data;
        this.message = message;

        if (config.environment === EEnvironment.DEV) {
            this.printError();
        }
    }

    printError() {
        console.log("ERROR", this.message, this.backendErrorMessage);
    }
}
