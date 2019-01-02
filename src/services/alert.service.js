import { Store } from "../refs";
import { CREATE_ALERT, REMOVE_ALERT, REMOVE_ALERT_ALL } from "../reducers/alert.reducer";

const { dispatch } = Store;

export default class AlertService {
    static create(typeAlert, message) {
        const result = { type: typeAlert, message, _id: Date.now() };
        setTimeout(() => { this.remove(result._id); }, 4000);
        return dispatch({ type: CREATE_ALERT, result });
    }

    static success(message) {
        return this.create('SUCCESS', message);
    }

    static error(message) {
        return this.create('ERROR', message);
    }

    static remove(_id) {
        return dispatch({ type: REMOVE_ALERT, _id })
    }

    static removeAll() {
        return dispatch({ type: REMOVE_ALERT_ALL })
    }
}