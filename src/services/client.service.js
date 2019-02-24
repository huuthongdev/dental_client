import { Store, RequestService, AlertService, ITEMS_PER_PAGE, MainService } from "../refs";
import { SET_CLIENT } from "../reducers/client.reducer";
import { SET_CLIENT_DETAIL } from "../reducers/client.detail.reducer";

const { dispatch } = Store;

export default class ClientService {
    static async set(offset = 0, pageNumber = 1, textSearch = '', forceUpdate = false) {
        return RequestService.get('/client', { offset, limit: ITEMS_PER_PAGE, textSearch })
            .then(result => {
                dispatch({
                    type: SET_CLIENT,
                    data: result.data,
                    count: result.count,
                    pageNumber,
                    forceUpdate
                });
                return result;
            })
            .catch(error => {
                AlertService.error(error.message);
                return;
            });
    }

    static async setDetail(_id, replace = false) {
        const { clientDetail } = Store.getState();
        const client = clientDetail.find(v => v._id === _id);
        if (client && !replace) return client;
        return RequestService.get(`/client/${_id}`)
            .then(result => {
                dispatch({ type: SET_CLIENT_DETAIL, result, _id });
                return result;
            })
            .catch(error => {
                AlertService.error(error.message);
                return;
            });
    }

    static async create(payload) {
        return RequestService.post('/client', payload)
            .then(async result => {
                await this.set(0, 1, '', true);
                MainService.getMainDashboadInfo();
                AlertService.success(`Đã tạo khách hàng: ${result.name}`);
                return result;
            })
            .catch(error => {
                AlertService.error(error.message);
                return false;
            })
    }

    static async update(_id, payload) {
        return RequestService.put(`/client/${_id}`, payload)
            .then(async result => {
                dispatch({ type: SET_CLIENT_DETAIL, result });
                AlertService.success(`Đã cập nhật khách hàng: ${result.name}`);
                return result;
            })
            .catch(error => {
                AlertService.error(error.message);
                return false;
            })
    }

    static async getDetail(_id) {
        return RequestService.get("/client/detail/" + _id)
            .then(result => {
                dispatch({ type: SET_CLIENT_DETAIL, result, _id });
                return result;
            })
            .catch(error => console.log(error.message));
    }
}