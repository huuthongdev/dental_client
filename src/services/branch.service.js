import { Store, RequestService, AlertService } from "../refs";
import { SET_BRANCH, CREATE_BRANCH, UPDATE_BRANCH, SET_BRANCH_DETAIL } from "../reducers/branch.reducer";

const { dispatch } = Store;

export default class BranchService {
    static async set() {
        return RequestService.get('/branch')
            .then(result => dispatch({ type: SET_BRANCH, result }))
            .catch(error => AlertService.create('ERROR', error.message));
    }

    static async create(payload) {
        return RequestService.post("/branch", payload)
            .then(result => {
                dispatch({ type: CREATE_BRANCH, result });
                AlertService.create('SUCCESS', `Tạo thành công chi nhánh: ${result.name}`);
                return result;
            })
            .catch(error => {
                AlertService.create('ERROR', error.message);
                return false;
            });
    }

    static async update(_id, payload) {
        return RequestService.put("/branch/" + _id, payload)
            .then(result => {
                dispatch({ type: UPDATE_BRANCH, result });
                AlertService.create('SUCCESS', `Cập nhật thành công chi nhánh: ${result.name}`);
                return result;
            })
            .catch(error => {
                AlertService.create('ERROR', error.message);
                return false;
            });
    }

    static async setDetail(_id) {
        return RequestService.get("/branch/detail/" + _id)
            .then(result => {
                dispatch({ type: SET_BRANCH_DETAIL, result });
                return result;
            })
            .catch(error => {
                console.log(error.message);
                return false;
            });
    }
}