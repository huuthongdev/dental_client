import { RequestService, Store, AlertService } from "../refs";
import { SET_SERVICE, CREATE_SERVICE } from "../reducers/service.reducer";

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
}