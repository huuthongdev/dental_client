import { Store, RequestService, AlertService } from "../refs";
import { SET_CLIENT, CREATE_CLIENT, UPDATE_CLIENT } from "../reducers/client.reducer";
import { SET_CLIENT_DETAIL } from "../reducers/client.detail.reducer";

const { dispatch } = Store;

export default class ClientService {
    static async set() {
        return RequestService.get('/client')
            .then(result => dispatch({ type: SET_CLIENT, result }))
            .catch(error => AlertService.error(error.message));
    }

    static async create(payload) {
        return RequestService.post('/client', payload)
            .then(result => {
                dispatch({ type: CREATE_CLIENT, result })
                AlertService.success(`Đã tạo khách hàng: ${result.name}`);
                return result;
            })
            .catch(error => {
                AlertService.error(error.message);
                return false;
            })
    }

    static async update(_id, payload) {
        return RequestService.put('/client/' + _id, payload)
            .then(result => {
                dispatch({ type: UPDATE_CLIENT, result });
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
                dispatch({ type: SET_CLIENT_DETAIL, result });
                return result;
            })
            .catch(error => console.log(error.message));
    }
}