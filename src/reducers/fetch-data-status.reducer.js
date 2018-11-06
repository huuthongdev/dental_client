import { SET_BRANCH } from "../actions/branch.actions";
import { SET_EMPLOYEE } from "../actions/employee.actions";

const defaultState = {
    branch: false,
    employee: false
}

export const fetchDataStatusReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_BRANCH:
            return { ...state, branch: true }
        case SET_EMPLOYEE:
            return { ...state, employee: true }
        default:
            return state
    }
}