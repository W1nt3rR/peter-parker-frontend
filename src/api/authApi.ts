import { type AxiosInstance } from 'axios';

export default class AuthApi {
    axios: AxiosInstance;

    constructor(axios: AxiosInstance) {
        this.axios = axios;
    }

    async login(email: string, password: string) {
        const response = await this.axios.post('/User/LogIn', { email, password });

        this.setSession(response.data);
        console.log(response.data);
    }

    async setSession(token: string) {
        // store token as session in localstorage
        localStorage.setItem('token', token);
        this.axios.defaults.headers.common['Authorization'] = `bearer ${token}`;
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