import { LOG_OUT } from "../actions/user.actions";

const defaultState = {};
export const mainReducer = (state = defaultState, action) => {
    switch (action.type) {
        case LOG_OUT:
            return defaultState;
        default:
            return state
    }
}