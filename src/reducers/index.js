import { mainReducer } from "./main.reducer";
import { userReducer } from "./user.reducer";
import { combineReducers } from "redux";
import { branchReducer } from "./branch.reducer";
import { alertReducer } from "./alert.reducer";
import { fetchDataStatusReducer } from "./fetch-data-status.reducer";
import { employeeReducer } from "./employee.reducer";
import { serviceReducer } from "./service.reducer";
import { productReducer } from "./product.reducer";
import { confirmReducer } from "./confirm.reducer";
import { clientReducer } from "./client.reducer";
import { ticketReducer } from "./ticket.reducer";
import { clientDetailReducer } from "./client.detail.reducer";
import { ticketDetailReducer } from "./ticket.detail.reducer";
import { employeeDetailReducer } from "./employee.detail.reducer";
import { calendarDentistReducer } from "./calendarDentist.reducer";
import { receiptVoucherReducer } from "./receiptVoucher.reducer";

export default combineReducers({
    main: mainReducer,
    alert: alertReducer,
    confirm: confirmReducer,
    fetchDataStatus: fetchDataStatusReducer,
    
    user: userReducer,
    branch: branchReducer,
    product: productReducer,

    service: serviceReducer,

    employee: employeeReducer,
    employeeDetail: employeeDetailReducer,

    client: clientReducer,
    clientDetail: clientDetailReducer,

    ticket: ticketReducer,
    ticketDetail: ticketDetailReducer,

    calendarDentist: calendarDentistReducer,

    receiptVoucher: receiptVoucherReducer
});