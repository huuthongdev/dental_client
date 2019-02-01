import { Store, RequestService, AlertService, BranchService } from "../refs";
import { SET_USER_INFO, LOG_OUT } from "../reducers/user.reducer";

const { dispatch } = Store;

export default class UserService {
    static async setLocalStorageUserInfo(token) {
        localStorage.setItem("TOKEN", token);
    }

    static async removeLocalStorageUserInfo() {
        localStorage.removeItem("TOKEN");
        localStorage.removeItem("BRANCH");
    }

    static getRolesInCurrentBranch() {
        const branchIdLocal = localStorage.getItem('BRANCH');
        if (!branchIdLocal) return [];
        const { user } = Store.getState();
        if (!user) return [];
        const rolesCurrentBranch = user.roleInBranchs ? user.roleInBranchs.find(v => v.branch._id.toString() === branchIdLocal) : null;
        if (!rolesCurrentBranch) return [];
        return rolesCurrentBranch.roles;
    }

    static checkAuth() {
        const token_local_storage = localStorage.getItem("TOKEN");
        const branch_local_storage = localStorage.getItem("BRANCH");
        // (1) Not have token in localStorage (Login)
        if (!token_local_storage) return 1;
        // (2) Have token in localStorage || Not authen (Authentication -> check token)
        const { user } = Store.getState();
        if (!user.token) return 2;
        // (3) Authen Success, Select place working (Select Place)
        if (!branch_local_storage) return 3;
        // (4) Authen completed (Success)
        return 4;
    }

    static setCurrentBranch(branchId) {
        localStorage.setItem("BRANCH", branchId);
    }

    static async login(payload) {
        return RequestService.post('/user/log-in', payload)
            .then(result => {
                this.setLocalStorageUserInfo(result.token);
                if (result.roleInBranchs && result.roleInBranchs.length === 1) this.setCurrentBranch(result.roleInBranchs[0].branch._id)
                dispatch({ type: SET_USER_INFO, result });
                AlertService.success('Đăng nhập thành công');
                return result;
            })
            .catch(error => {
                AlertService.error(error.message);
                return false;
            })
    }

    static async authentication() {
        return RequestService.get('/user/check')
            .then(result => {
                this.setLocalStorageUserInfo(result.token);
                dispatch({ type: SET_USER_INFO, result });
                return result;
            })
            .catch(error => {
                this.removeLocalStorageUserInfo();
                AlertService.error('Lỗi xác thực! Vui lòng đăng nhập lại');
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

    static async logOut() {
        this.removeLocalStorageUserInfo();
        return dispatch({ type: LOG_OUT });
    }
}