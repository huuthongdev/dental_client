import { RequestService, createAlert } from "../refs";

export const SET_SERVICE = 'SET_SERVICE';
export const setService = () => dispatch => {
    return RequestService.get('/service')
        .then(result => dispatch({ type: SET_SERVICE, result }))
        .catch(error => dispatch(createAlert('ERROR', error.message)));
}