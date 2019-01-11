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

export default combineReducers({
    fetchDataStatus: fetchDataStatusReducer,
    alert: alertReducer,
    confirm: confirmReducer,
    main: mainReducer,
    user: userReducer,
    branch: branchReducer,
    employee: employeeReducer,
    service: serviceReducer,
    product: productReducer,
    client: clientReducer,
    clientDetail: clientDetailReducer,
    ticket: ticketReducer,
    ticketDetail: ticketDetailReducer
});