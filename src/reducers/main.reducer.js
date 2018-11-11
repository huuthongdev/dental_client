import { LOG_OUT } from "../actions/user.actions";
import { FETCH_TEMP } from "../actions/main.actions";

const defaultState = {
    temp: null
};
export const mainReducer = (state = defaultState, action) => {
    switch (action.type) {
        case FETCH_TEMP:
            return { ...state, temp: action.temp }
        case LOG_OUT:
            return defaultState;
        default:
            return state
    }
}