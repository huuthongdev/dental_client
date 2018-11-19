import { SET_BRANCH } from "../actions/branch.actions";
import { SET_EMPLOYEE } from "../actions/employee.actions";
import { LOG_OUT } from "../actions/user.actions";
import { SET_SERVICE } from "../actions/service.actions";
import { SET_PRODUCT } from "../actions/product.actions";
import { SET_CLIENT } from "../actions/client.actions";

const defaultState = {
    branch: false,
    employee: false,
    service: false,
    product: false,
    client: false
}

export const fetchDataStatusReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_BRANCH:
            return { ...state, branch: true }
        case SET_EMPLOYEE:
            return { ...state, employee: true }
        case SET_SERVICE:
            return { ...state, service: true }
        case SET_PRODUCT:
            return { ...state, product: true }
        case SET_CLIENT:
            return { ...state, client: true }
        case LOG_OUT:
            return defaultState;
        default:
            return state
    }
}