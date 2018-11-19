import { SET_CLIENT } from "../actions/client.actions";

const defaultState = []
export const clientReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_CLIENT:
            return state = action.result;
        default:
            return state
    }
}