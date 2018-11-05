import { LOG_OUT } from "../actions/user.actions";
import { SET_BRANCH } from "../actions/branch.actions";

const defaultState = []
export const branchReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_BRANCH:
            return action.result;
        case LOG_OUT:
            return defaultState;
        default:
            return state
    }
}