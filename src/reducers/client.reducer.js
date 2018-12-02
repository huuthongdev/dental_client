import { SET_CLIENT, CREATE_CLIENT, SET_CLIENT_DETAIL, UPDATE_CLIENT } from "../actions/client.actions";

const defaultState = []
export const clientReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_CLIENT:
            return state = action.result;
        case CREATE_CLIENT:
            return [...state, action.result];
        case SET_CLIENT_DETAIL:
            return state.map(v => (v._id === action.result._id ? action.result : v));
        case UPDATE_CLIENT:
            return state.map(v => (v._id === action.result._id ? action.result : v));
        default:
            return state
    }
}