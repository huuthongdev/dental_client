import { Store, BranchService, EmployeeService, ServiceService, ProductService, ClientService, TicketService } from "../refs";
import Axios from "axios";
import { SET_TEMP } from "../reducers/main.reducer";
import { SET_INIT_DATA } from "../reducers/fetch-data-status.reducer";

const { dispatch } = Store;

export default class MainService {
    static async setTemp() {
        Axios.get('https://api.openweathermap.org/data/2.5/weather?q=Saigon&units=metric&appid=8d4f36fa4f4b9967bf5ce741f8bf789c')
            .then(result => {
                const { temp } = result.data.main;
                dispatch({ type: SET_TEMP, temp });
            });
    }

    static async initData() {
        const { user, fetchDataStatus } = Store.getState();
        const token = localStorage.getItem("TOKEN");
        const currentBranch = localStorage.getItem("BRANCH");
        if (!token || !currentBranch) return;
        if (!user._id) return;
        if (fetchDataStatus.initData) return;
        dispatch({ type: SET_INIT_DATA });
        this.setTemp();
        BranchService.set();
        EmployeeService.set();
        ServiceService.set();
        ProductService.set();
        ClientService.set();
        TicketService.set();
    }
}