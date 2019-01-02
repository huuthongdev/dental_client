import { mainReducer } from "./main.reducer";
import { userReducer } from "./user.reducer";
import { combineReducers } from "redux";
import { branchReducer } from "./branch.reducer";
import { alertReducer } from "./alert.reducer";
import { fetchDataStatusReducer } from "./fetch-data-status.reducer";
import { employeeReducer } from "./employee.reducer";
import { serviceReducer } from "./service.reducer";
import { productReducer } from "./product.reducer";
import { confirmRemoveReducer } from "./confirm-remove.reducer";
import { clientReducer } from "./client.reducer";
import { ticketReducer } from "./ticket.reducer";

export const allReducers = combineReducers({
    fetchDataStatus: fetchDataStatusReducer,
    alert: alertReducer,
    confirmRemove: confirmRemoveReducer,
    main: mainReducer,
    user: userReducer,
    branch: branchReducer,
    employee: employeeReducer,
    service: serviceReducer,
    product: productReducer,
    client: clientReducer,
    ticket: ticketReducer
});