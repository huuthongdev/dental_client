import { RequestService, createAlert } from '../refs';

export const SET_BRANCH = 'SET_BRANCH';
export const setBranch = () => async dispatch => {
    return RequestService.get('/branch')
        .then(result => dispatch({ type: SET_BRANCH, result }))
        .catch(error => dispatch(createAlert('ERROR', error.message)));
}

export const ADD_BRANCH = 'ADD_BRANCH';
export const createBranch = (dataSend, returnMain) => async dispatch => {
    return RequestService.post('/branch', dataSend)
        .then(result => {
            dispatch({ type: ADD_BRANCH, result });
            dispatch(createAlert('SUCCESS', `Tạo thành công chi nhánh: ${result.name}`));
            returnMain();
        })
        .catch(error => dispatch(createAlert('ERROR', error.message)));
}

export const UPDATE_BRANCH = 'UPDATE_BRANCH';
export const updateBranch = (branchId, dataSend) => async dispatch => {
    return RequestService.put('/branch/' + branchId, dataSend)
        .then(result => {
            dispatch({ type: UPDATE_BRANCH, result });
            dispatch(createAlert('SUCCESS', `Cập nhật thành công chi nhánh: ${result.name}`));
        })
        .catch(error => dispatch(createAlert('ERROR', error.message)));
}

export const REMOVE_BRANCH = 'REMOVE_BRANCH';
export const removeBranch = (branchId, loaded) => async dispatch => {
    return RequestService.delete('/branch/' + branchId)
        .then(result => {
            dispatch({ type: REMOVE_BRANCH, result });
            dispatch(createAlert('SUCCESS', `Xoá thành công chi nhánh: ${result.name}`));
            loaded();
        })
        .catch(error => {
            dispatch(createAlert('ERROR', error.message));
            loaded();
        });
}