import { Store, RequestService, AlertService } from "../refs";
import { SET_EMPLOYEE, CREATE_EMPLOYEE, UPDATE_EMPLOYEE } from "../reducers/employee.reducer";
import { SET_EMPLOYEE_DETAIL } from "../reducers/employee.detail.reducer";

const { dispatch } = Store;

export default class EmployeeService {
    static async set() {
        return RequestService.get('/user/employees')
            .then(result => dispatch({ type: SET_EMPLOYEE, result }))
            .catch(error => AlertService.create('ERROR', error.message));
    }

    static async create(payload) {
        return RequestService.post('/user', payload)
            .then(result => {
                dispatch({ type: CREATE_EMPLOYEE, result });
                AlertService.success(`Tạo thành công nhân sự: ${result.name}`);
                return result;
            })
            .catch(error => {
                AlertService.error(error.message);
                return false;
            });
    }

    static async update(_id, payload) {
        return RequestService.put('/user/' + _id, payload)
            .then(result => {
                dispatch({ type: UPDATE_EMPLOYEE, result });
                AlertService.success(`Cập nhật thành công nhân sự: ${result.name}`);
                return result;
            })
            .catch(error => {
                AlertService.error(error.message);
                return false;
            });
    }

    static async setDetail(_id) {
        return RequestService.get('/user/' + _id)
            .then(result => {
                dispatch({ type: SET_EMPLOYEE_DETAIL, result });
                return result;
            })
            .catch(() => {
                return false;
            })
    }
}
