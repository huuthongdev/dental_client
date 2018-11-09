import { RequestService, createAlert } from "../refs";

export const SET_SERVICE = 'SET_SERVICE';
export const setService = () => dispatch => {
    return RequestService.get('/service')
        .then(result => dispatch({ type: SET_SERVICE, result }))
        .catch(error => dispatch(createAlert('ERROR', error.message)));
}

export const ADD_SERVICE = 'ADD_SERVICE';
export const createService = (dataSend, returnMain, loaded) => dispatch => {
    return RequestService.post('/service', dataSend, loaded)
        .then(result => {
            dispatch({ type: ADD_SERVICE, result });
            dispatch(createAlert('SUCCESS', `Tạo thành công dịch vụ: ${result.name}`));
            returnMain();
        })
        .catch(error => {
            dispatch(createAlert('ERROR', error.message));
            loaded();
        });
}

export const UPDATE_SERVICE = 'UPDATE_SERVICE';
export const updateService = (serviceId, dataSend, returnMain) => dispatch => {
    return RequestService.put('/service/' + serviceId, dataSend)
    .then(result => {
        dispatch({ type: UPDATE_SERVICE, result });
        dispatch(createAlert('SUCCESS', `Cập nhật thành công dịch vụ: ${result.name}`));
        returnMain();
    })
    .catch(error => dispatch(createAlert('ERROR', error.message)));
}
