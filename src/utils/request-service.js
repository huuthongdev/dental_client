import axios from 'axios';
import { URL_SERVER_API } from '../setting';

export class RequestService {
    static getConfig() {
        const token = localStorage.getItem('TOKEN');
        const branch = localStorage.getItem('BRANCH');
        const config = { headers: { token, branch } };
        return token ? config: null;
    }

    static get(subUrl) {
        return axios.get(`${URL_SERVER_API}${subUrl}`, RequestService.getConfig())
        .then(res => res.data.result)
        .catch(error => { throw new Error(error.response.data.message); })
    }

    static post(subUrl, data) {
        return axios.post(`${URL_SERVER_API}${subUrl}`, data, RequestService.getConfig())
        .then(res => res.data.result)
        .catch(error => { throw new Error(error.response.data.message); })
    }
}
