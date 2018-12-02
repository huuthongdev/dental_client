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

export const SET_CLIENT_DETAIL = "SET_CLIENT_DETAIL";
export const setClientDetail = _id => async dispatch => {
    return RequestService.get("/client/detail/" + _id)
        .then(result => dispatch({ type: SET_CLIENT_DETAIL, result }))
        .catch(error => console.log(error.message));
};

export const UPDATE_CLIENT = 'UPDATE_CLIENT';
export const updateClient = (result) => dispatch => {
    return dispatch({ type: UPDATE_CLIENT, result });
}