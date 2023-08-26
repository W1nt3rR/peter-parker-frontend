import { type AxiosInstance } from 'axios';

export default class AuthApi {
    axios: AxiosInstance;

    constructor(axios: AxiosInstance) {
        this.axios = axios;
    }

    async login(username: string, password: string) {
        const response = await this.axios.post('/User/LogIn', { username, password });

        console.log(response);
        
    }

    logout() {
        // return this.axios.post('/auth/logout');
    }

    register(username: string, password: string) {
        return this.axios.post('/User/Register', { username, password });
    }

    me() {
        return this.axios.get('/User');
    }
}