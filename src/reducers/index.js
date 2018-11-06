import { mainReducer } from "./main.reducer";
import { userReducer } from "./user.reducer";
import { combineReducers } from "redux";
import { branchReducer } from "./branch.reducer";
import { alertReducer } from "./alert.reducer";
import { fetchDataStatusReducer } from "./fetch-data-status.reducer";
import { employeeReducer } from "./employee.reducer";

export const AllReducers = combineReducers({
    main: mainReducer,
    user: userReducer,
    branch: branchReducer,
    alert: alertReducer,
    fetchDataStatus: fetchDataStatusReducer,
    employee: employeeReducer
});