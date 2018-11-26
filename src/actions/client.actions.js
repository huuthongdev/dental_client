import { RequestService, createAlert } from "../refs";

export const SET_CLIENT = 'SET_CLIENT';
export const setClient = () => async dispatch => {
    return RequestService.get('/client')
        .then(result => dispatch({ type: SET_CLIENT, result }))
        .catch(error => dispatch(createAlert("ERROR", error.message)));
};

export const CREATE_CLIENT = 'CREATE_CLIENT';
export const createClient = (result) => dispatch => {
    return dispatch({ type: CREATE_CLIENT, result });
}