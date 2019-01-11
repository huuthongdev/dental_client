import { Store } from "../refs";
import { ON_CONFIRM, OFF_CONFIRM } from "../reducers/confirm.reducer";

const { dispatch } = Store;

export default class ConfirmService {
    static async on(method, objectType, nameRelated, content, onNext) {
        return dispatch({ type: ON_CONFIRM, nameRelated, content, objectType, onNext, method });
    }

    static async off() {
        return dispatch({ type: OFF_CONFIRM });
    }
}