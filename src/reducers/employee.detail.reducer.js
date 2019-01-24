const defaultState = [];

export const SET_EMPLOYEE_DETAIL = 'SET_EMPLOYEE_DETAIL';

export const employeeDetailReducer = (state = defaultState, action) => {
    const { type, result } = action;
    if (type === SET_EMPLOYEE_DETAIL) {
        const checkExited = state.find(v => v._id === result._id);
        if (checkExited) return state.map(v => v._id === result._id ? result : v);
        return [...state, result];
    }
    return state;
}