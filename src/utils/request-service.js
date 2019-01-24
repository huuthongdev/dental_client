import axios from 'axios';
import { URL_SERVER_API } from '../setting';


export class RequestService {
    static getConfig() {
        const token = localStorage.getItem('TOKEN');
        const branch = localStorage.getItem('BRANCH');
        const config = { headers: { token, branch } };
        return token ? config : null;
    }

    static resError = (error) => {
        if (!error.response) throw new Error('Không kết nối được hệ thống!');
        throw new Error(error.response.data.message);
    }

    static async get(subUrl, params = {}) {
        return axios.get(`${URL_SERVER_API}${subUrl}`, { ...this.getConfig(), params })
            .then(res => res.data.result)
            .catch(this.resError)
    }

    static async post(subUrl, data) {
        return axios.post(`${URL_SERVER_API}${subUrl}`, data, this.getConfig())
            .then(res => res.data.result)
            .catch(this.resError)
    }

    static async put(subUrl, data) {
        return axios.put(`${URL_SERVER_API}${subUrl}`, data, this.getConfig())
            .then(res => res.data.result)
            .catch(this.resError)
    }

    static async delete(subUrl) {
        return axios.delete(`${URL_SERVER_API}${subUrl}`, RequestService.getConfig())
            .then(res => res.data.result)
            .catch(this.resError)
    }
}
