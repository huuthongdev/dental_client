import { Store, RequestService, AlertService } from "../refs";
import { SET_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT } from "../reducers/product.reducer";

const { dispatch } = Store;

export default class ProductService {
    static async set() {
        return RequestService.get('/product')
            .then(result => dispatch({ type: SET_PRODUCT, result }))
            .catch(error => AlertService.error(error.message));
    }

    static async create(payload) {
        return RequestService.post('/product', payload)
            .then(result => {
                dispatch({ type: CREATE_PRODUCT, result });
                AlertService.success(`Tạo thành công sản phẩm: ${result.name}`);
                return true;
            })
            .catch(error => {
                AlertService.error(error.message);
                return false;
            })
    }

    static async update(_id, payload) {
        return RequestService.put('/product/' + _id, payload)
            .then(result => {
                dispatch({ type: UPDATE_PRODUCT, result });
                AlertService.success(`Đã cập nhật sản phẩm: ${result.name}`);
                return true;
            })
            .catch(error => {
                AlertService.error(error.message);
                return false;
            })
    }
}