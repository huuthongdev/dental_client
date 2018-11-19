import { RequestService, createAlert } from "../refs";

export const SET_EMPLOYEE = 'SET_EMPLOYEE';
export const setEmployee = () => dispatch => {
    return RequestService.get('/user/employees')
    .then(result => dispatch({ type: SET_EMPLOYEE, result }))
    .catch(error => dispatch(createAlert('ERROR', error.message)));
};

export const CREATE_EMPLOYEE = 'CREATE_EMPLOYEE';
export const createEmployee = (dataSend, loaded, redirectToDetail) => dispatch => {
    return RequestService.post('/user', dataSend)
    .then(result => {
        dispatch({ type: CREATE_EMPLOYEE, result });
        dispatch(createAlert('SUCCESS', `Tạo thành công nhân sự: ${result.name}`));
        redirectToDetail(result._id);
    })
    .catch(error => {
        dispatch(createAlert('ERROR', error.message));
        loaded();
    });
};

export const SET_EMPLOYEE_DETAIL = "SET_EMPLOYEE_DETAIL";
export const setEmployeeDetail = _id => async dispatch => {
  return RequestService.get('/user/detail/' + _id)
    .then(result => dispatch({ type: SET_EMPLOYEE_DETAIL, result }))
    .catch(error => console.log(error.message));
};

export const UPDATE_EMPLOYEE = 'UPDATE_EMPLOYEE';
export const updateEmployee = (_id, dataSend, errorFn) => dispatch => {
    return RequestService.put('/user/' + _id, dataSend)
    .then(result => {
        dispatch({ type: UPDATE_EMPLOYEE, result });
        dispatch(createAlert('SUCCESS', `Cập nhật thành công nhân sự: ${result.name}`));
    })
    .catch(error => {
        dispatch(createAlert('ERROR', error.message));
        errorFn();
    });
};