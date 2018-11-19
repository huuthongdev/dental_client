import { RequestService, createAlert } from "../refs";

export const SET_PRODUCT = 'SET_PRODUCT';
export const setProduct = () => dispatch => {
    return RequestService.get('/product')
        .then(result => dispatch({ type: SET_PRODUCT, result }))
        .catch(error => dispatch(createAlert('ERROR', error.message)));
}

export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const createProduct = (dataSend, loaded, redirectToDetail) => dispatch => {
    return RequestService.post('/product', dataSend, loaded)
        .then(result => {
            dispatch({ type: CREATE_PRODUCT, result });
            dispatch(createAlert('SUCCESS', `Tạo thành công dịch vụ: ${result.name}`));
            redirectToDetail(result._id);
        })
        .catch(error => {
            dispatch(createAlert('ERROR', error.message));
            loaded();
        });
}

export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const updateProduct = (productId, dataSend, success, errorFn) => dispatch => {
    return RequestService.put('/product/' + productId, dataSend)
        .then(result => {
            dispatch({ type: UPDATE_PRODUCT, result });
            dispatch(createAlert('SUCCESS', `Cập nhật thành công dịch vụ: ${result.name}`));
            success();
        })
        .catch(error => {
            dispatch(createAlert('ERROR', error.message));
            errorFn();
        });
}

export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
export const removeProduct = (productId, loaded) => async dispatch => {
    return RequestService.delete('/product/' + productId)
        .then(result => {
            dispatch({ type: REMOVE_PRODUCT, result });
            dispatch(createAlert('SUCCESS', `Xoá thành công sản phẩm: ${result.name}`));
            loaded();
        })
        .catch(error => {
            dispatch(createAlert('ERROR', error.message));
            loaded();
        });
}
