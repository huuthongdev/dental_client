import { Store, RequestService, AlertService } from "../refs";
import { SET_TICKETS, CREATE_TICKET } from "../reducers/ticket.reducer";

const { dispatch } = Store;

export default class TicketService {
    static async set() {
        return RequestService.get('/ticket')
            .then(result => dispatch({ type: SET_TICKETS, result }))
            .catch(error => AlertService.error(error.message));
    }

    static async create(payload) {
        return RequestService.post('/ticket', payload)
            .then(result => {
                dispatch({ type: CREATE_TICKET, result })
                AlertService.success(`Đã tạo phiếu cho khách hàng ${result.client.name}`);
                return result;
            })
            .catch(error => {
                AlertService.error(error.message);
                return false;
            })
    }
}