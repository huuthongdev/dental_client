import { RequestService, Store, AlertService } from "../refs";
import { SET_SERVICE, CREATE_SERVICE, UPDATE_SERVICE } from "../reducers/service.reducer";

const { dispatch } = Store;

export default class ServiceService {
    static async set() {
        return RequestService.get('/service')
            .then(result => dispatch({ type: SET_SERVICE, result }))
            .catch(error => AlertService.create('ERROR', error.message));
    }

    static async create(payload) {
        return RequestService.post('/service', payload)
            .then(result => {
                dispatch({ type: CREATE_SERVICE, result });
                AlertService.create('SUCCESS', `Tạo thành công dịch vụ: ${result.name}`);
                return true;
            })
            .catch(error => {
                AlertService.create('ERROR', error.message);
                return false;
            });
    }

    static async update(_id, payload) {
        return RequestService.put('/service/' + _id, payload)
            .then(result => {
                dispatch({ type: UPDATE_SERVICE, result });
                AlertService.create('SUCCESS', `Đã cập nhật dịch vụ: ${result.name}`);
                return result;
            })
            .catch(error => {
                AlertService.create('ERROR', error.message);
                return false;
            });
    }
}