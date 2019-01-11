const defaultState = [];

export const SET_TICKET_DETAIL = 'SET_TICKET_DETAIL';

export const ticketDetailReducer = (state = defaultState, action) => {
    const { type } = action;
    if (type === SET_TICKET_DETAIL) {
        const check = state.find(v => v._id === action.id);
        // Client fetched
        if (check) return state.map(v => v._id === action._id ? action.result : v);
        // Client initial fetch
        return [action.result, ...state];
    }
    return state;
}