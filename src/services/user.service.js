import { Store, RequestService, AlertService, BranchService } from "../refs";
import { SET_USER_INFO } from "../reducers/user.reducer";

const { dispatch } = Store;

export default class UserService {
    static async login(loginInfo, password) {
        return RequestService.post('/user/log-in', { loginInfo, password })
            .then(result => {
                localStorage.setItem("TOKEN", result.token);
                dispatch({ type: SET_USER_INFO, result });
                AlertService.success('Đăng nhập thành công');
                return result;
            })
            .catch(error => {
                AlertService.error(error.message);
                return false;
            })
    }

    static async setRoleInBranch(userId, branchId, roles) {
        try {
            await RequestService.put('/user/set-role-in-branch', { userId, branchId, roles });
            await BranchService.setDetail(branchId);
            AlertService.success('Sắp xếp nhân sự & vai trò thành công');
            return true;
        } catch (error) {
            AlertService.error('Lỗi!');
            return false;
        }
    }
}