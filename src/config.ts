export enum EEnvironment {
    DEV = "development",
    PROD = "production",
    TEST = "test",
}

const config = {
    apiBaseURL: import.meta.env.VITE_API_BASE_URL as string,
    environment: import.meta.env.VITE_ENVIRONMENT as EEnvironment,
};

export default config;
