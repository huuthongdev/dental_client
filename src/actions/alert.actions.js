export const CREATE_ALERT = 'CREATE_ALERT';
export const createAlert = (typeAlert, message) => dispatch => {
    const result = { type: typeAlert, message, _id: Date.now() }
    setTimeout(() => { dispatch(removeAlert(result._id)); }, 3000);
    return dispatch({ type: CREATE_ALERT, result });
}

export const REMOVE_ALERT = 'REMOVE_ALERT';
export const removeAlert = (_id) => {
    return {
        type: REMOVE_ALERT,
        _id
    }
}