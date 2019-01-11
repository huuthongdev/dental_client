import { Store, RequestService, AlertService, ConfirmService } from "../refs";
import { SET_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT, REMOVE_PRODUCT } from "../reducers/product.reducer";

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

    static disable(value) {
        const disable = () => {
            console.log(value);
        }
        return ConfirmService.on('Vô hiệu', 'sản phẩm', value.name, 'xoá sản phẩm có thể ...', disable);
    }

    static remove(value) {
        const handleRemove = async () => {
            return RequestService.delete('/product/' + value._id)
                .then(result => {
                    dispatch({ type: REMOVE_PRODUCT, result });
                    AlertService.success(`Đã xoá dịch vụ ${result.name}`);
                    return result;
                })
                .catch(error => {
                    AlertService.error(error.message);
                    return false;
                });
        }
        return ConfirmService.on('Xoá', 'sản phẩm', value.name, 'Xoá sản phẩm có thể ảnh hướng đến một số hồ sơ điều trị liên quan.', handleRemove)
    }
}