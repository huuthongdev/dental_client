import axios from 'axios';
import { URL_SERVER_API } from '../setting';

export class RequestService {
    static getConfig() {
        // const token = localStorage.getItem('TOKEN');
        // const config = { headers: { token } };
        // return token ? config: null;
        return null;
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

    static put(subUrl, data) {
        return axios.put(`${URL_SERVER_API}${subUrl}`, data, RequestService.getConfig())
        .then(res => res.data.result)
        .catch(error => { throw new Error(error.response.data.message); })
    }

    static delete(subUrl) {
        return axios.delete(`${URL_SERVER_API}${subUrl}`, RequestService.getConfig())
        .then(res => res.data.result)
        .catch(error => { throw new Error(error.response.data.message); })
    }
}
