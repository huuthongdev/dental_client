import { RequestService, createAlert } from "../refs";

export const SET_EMPLOYEE = 'SET_EMPLOYEE';
export const setEmployee = () => dispatch => {
    return RequestService.get('/user/employees')
    .then(result => dispatch({ type: SET_EMPLOYEE, result }))
    .catch(error => dispatch(createAlert('ERROR', error.message)));
}

export const ADD_EMPLOYEE = 'ADD_EMPLOYEE';
export const createEmployee = (dataSend, loaded, redirectToEmployeeDetail) => dispatch => {
    return RequestService.post('/user', dataSend)
    .then(result => {
        dispatch({ type: ADD_EMPLOYEE, result });
        dispatch(createAlert('SUCCESS', `Tạo thành công nhân sự: ${result.name}`));
        redirectToEmployeeDetail(result._id);
    })
    .catch(error => {
        dispatch(createAlert('ERROR', error.message));
        loaded();
    });
}