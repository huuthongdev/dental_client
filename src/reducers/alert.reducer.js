import { CREATE_ALERT, REMOVE_ALERT } from "../actions/alert.actions";
import { LOG_OUT } from "../actions/user.actions";

const defaultState = [];

export const alertReducer = (state = defaultState, action) => {
    switch (action.type) {
        case CREATE_ALERT:
            return [action.result, ...state]
        case REMOVE_ALERT:
            return state = state.filter(v => v._id !== action._id);
        case LOG_OUT:
            return defaultState;
        default:
            return state
    }
}