import { Store } from "../refs";

export const Role = {
    // Chủ tịch
    ADMIN: 'ADMIN',
    // Giám đốc điều hành chi nhánh
    DIRECTOR: 'DIRECTOR',
    // Chăm sóc khách hàng
    CUSTOMER_CARE_MANAGER: 'CUSTOMER_CARE_MANAGER',
    CUSTOMER_CARE: 'CUSTOMER_CARE',
    // Tài chính kế toán
    ACCOUNTING_MANAGER: 'ACCOUNTING_MANAGER',
    ACCOUNTANT: 'ACCOUNTANT',
    // X Ray
    X_RAY: 'X_RAY',
    // Nha sĩ
    DENTISTS_MANAGER: 'DENTISTS_MANAGER',
    DENTIST: 'DENTIST',
}

export default class CheckRoleService {
    static check(...rolesCheck) {
        rolesCheck = rolesCheck ? rolesCheck : [];
        const { user } = Store.getState();
        if (!user) return false;
        const roleInBranchs = user.roleInBranchs;
        const currentBranch = localStorage.getItem("BRANCH");
        let roles = roleInBranchs.find((v) => v.branch._id.toString() === currentBranch.toString());
        if (!roles) return false;
        roles = roles.roles;
        if (roles.find((v) => v === Role.ADMIN)) return true;
        // Check roles
        for (let i = 0; i < roles.length; i++) {
            if (rolesCheck.includes(roles[i])) return true;
        }
        return false;
    }

}