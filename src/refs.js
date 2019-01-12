// Images
import Logo from './assets/images/logo.svg';
import LogoBlue from './assets/images/logo-blue.svg';
import Background from './assets/images/bg.jpg';
import AvatarDemo from './assets/images/avatar.png';
// Components
import SubmitButtonsGroup from './components/SubmitButtonsGroup';
import CpnPopupWraper from './components/CpnPopupWraper';
import CpnSvg from "./components/CpnSvg";
import Confirm from "./components/Confirm";
import FetchingData from "./components/FetchingData";
import FadeAnimate from "./components/FadeAnimate";
import TitleApp from './components/TitleApp';
import CpnAlert from './components/alert/CpnAlert';
import CpnAlertItem from './components/alert/CpnAlertItem';
import ScreenDashboardSidebar from './screens/dashboard/ScreenDashboardSidebar';
import CpnTitle from './components/CpnTitle';

// Screens
import ScreenWraper from './screens/ScreenWraper';
import ScreenLogin from "./screens/login/ScreenLogin";
import ScreenNotMatch404 from './screens/ScreenNotMatch404';
import ScreenAuthentication from './screens/authentication/ScreenAuthentication';
import ScreenSelectBranch from './screens/select-branch/ScreenSelectBranch';

import ScreenDashboardHeader from './screens/dashboard/ScreenDashboardHeader';
import ScreenDashboardWraper from './screens/dashboard/ScreenDashboardWraper';

import ScreenDashboardMain from './screens/dashboard/main/ScreenDashboardMain';

import ScreenDashboardBranch from './screens/dashboard/branch/ScreenDashboardBranch';
import ScreenDashboardBranchCreate from './screens/dashboard/branch/ScreenDashboardBranchCreate';
import ScreenDashboardBranchDetail from './screens/dashboard/branch/detail/ScreenDashboardBranchDetail';
import ScreenDashboardBranchDetailUpdate from './screens/dashboard/branch/detail/ScreenDashboardBranchDetailUpdate';
import ScreenDashboardBranchDetailEmployees from './screens/dashboard/branch/detail/ScreenDashboardBranchDetailEmployees';
import ScreenDashboardBranchDetailEmployeeAdd from './screens/dashboard/branch/detail/ScreenDashboardBranchDetailEmployeeAdd';
import ScreenDashboardBranchRow from './screens/dashboard/branch/ScreenDashboardBranchRow';


import ScreenDashboardEmployee from './screens/dashboard/employee/ScreenDashboardEmployee';
import ScreenDashboardEmployeeRow from './screens/dashboard/employee/ScreenDashboardEmployeeRow';
import ScreenDashboardEmployeeCreate from './screens/dashboard/employee/ScreenDashboardEmployeeCreate';
import ScreenDashboardEmployeeDetail from './screens/dashboard/employee/detail/ScreenDashboardEmployeeDetail';
import ScreenDashboardEmployeeDetailUpdate from './screens/dashboard/employee/detail/ScreenDashboardEmployeeDetailUpdate';

import Service from './screens/dashboard/service/Service';
import ServiceCreate from './screens/dashboard/service/ServiceCreate';
import ServiceRow from './screens/dashboard/service/ServiceRow';
import ServiceDetail from './screens/dashboard/service/ServiceDetail';
import ServiceUpdate from './screens/dashboard/service/ServiceUpdate';

import ScreenDashboardProduct from './screens/dashboard/product/ScreenDashboardProduct';
import ProductRow from './screens/dashboard/product/ProductRow';
import ProductCreate from './screens/dashboard/product/ProductCreate';
import ScreenDashboardProductDetail from './screens/dashboard/product/detail/ScreenDashboardProductDetail';
import ScreenDashboardProductDetailUpdate from './screens/dashboard/product/detail/ScreenDashboardProductDetailUpdate';

import ScreenDashboardClient from './screens/dashboard/client/ScreenDashboardClient';
import ScreenDashboardClientCreate from './screens/dashboard/client/ScreenDashboardClientCreate';
import ScreenDashboardClientRow from './screens/dashboard/client/ScreenDashboardClientRow';

import ScreenDashboardClientDetail from './screens/dashboard/client/detail/ScreenDashboardClientDetail';
import ScreenDashboardClientDetailUpdate from './screens/dashboard/client/detail/ScreenDashboardClientDetailUpdate';

import Ticket from './screens/dashboard/ticket/Ticket';
import TicketRow from './screens/dashboard/ticket/TicketRow';
import TicketCreate from './screens/dashboard/ticket/TicketCreate';
import TicketDetail from './screens/dashboard/ticket/TicketDetail';
import TicketDetailCalendar from './screens/dashboard/ticket/detail/TicketDetailCalendar';
import TicketDetailCalendarPopupAdd from './screens/dashboard/ticket/detail/TicketDetailCalendarPopupAdd';
import TicketDetailCalendarRow from './screens/dashboard/ticket/detail/TicketDetailCalendarRow';

// Route
import Routes from "./routes/Routes";
// All Reducers
import allReducers from "./reducers";
// Setting
import { isDev, ITEMS_PER_PAGE } from './setting';
// Utils
import { RequestService } from './utils/request-service';
import Roles from './utils/roles';
import GetRoleName from './utils/get-role-name';
import converErrorMessage from './utils/convert-error-message';
import { convertToSave } from './utils/convertToSave';
import pageNavigation from './utils/pageNavigation';
import convertToSearch from './utils/convertToSearch';
import { getLabelGender } from './utils/getLabelGender';
import { convertTicketStatus } from './utils/convertTicketStatus';
import { convertGender } from './utils/convertGender';
import { convertStatus } from './utils/convertStatus';
// Actions
import { setService, createService, updateService, removeService } from './actions/service.actions';
import { setUserInfo, logOut } from './actions/user.actions';
import { setBranch, createBranch, updateBranch, removeBranch, setBranchDetail } from './actions/branch.actions';
import { createAlert, removeAlert } from './actions/alert.actions';
import { setEmployee, createEmployee, setEmployeeDetail, updateEmployee } from './actions/employee.actions';
import { setProduct, updateProduct, createProduct, removeProduct } from './actions/product.actions';
import { setClient, createClient, setClientDetail, updateClient } from './actions/client.actions';
// Data
import { VietNamPlaces } from './utils/vietnam-place';
import medicalHistoryData from './utils/medical-historys';
// Store
import Store from './store';
// Services
import AlertService from './services/alert.service';
import ServiceService from './services/service.service';
import BranchService from './services/branch.service';
import EmployeeService from './services/employee.service';
import MainService from './services/main.service';
import ProductService from './services/product.service';
import ClientService from './services/client.service';
import UserService from './services/user.service';
import TicketService from './services/ticket.service';
import ConfirmService from './services/confirm.service';

// ===================== EXPORT =====================
// Images
export { Logo, LogoBlue, AvatarDemo, Background }
// Components
export {
    CpnTitle,
    FetchingData, FadeAnimate, CpnAlert, CpnAlertItem, CpnSvg, TitleApp,
    CpnPopupWraper, Confirm, SubmitButtonsGroup
}
// Screens
export { ScreenWraper }
export { ScreenLogin }
export { ScreenAuthentication }
export { ScreenSelectBranch }
export { ScreenNotMatch404 }
export { ScreenDashboardHeader, ScreenDashboardWraper, ScreenDashboardSidebar }
export { ScreenDashboardMain }
export {
    ScreenDashboardBranch, ScreenDashboardBranchRow, ScreenDashboardBranchDetailEmployeeAdd, ScreenDashboardBranchDetail,
    ScreenDashboardBranchCreate, ScreenDashboardBranchDetailUpdate, ScreenDashboardBranchDetailEmployees
}
export { 
    ScreenDashboardEmployee, ScreenDashboardEmployeeCreate, ScreenDashboardEmployeeDetail, 
    ScreenDashboardEmployeeRow, ScreenDashboardEmployeeDetailUpdate 
}
export { Service, ServiceCreate, ServiceDetail, ServiceUpdate, ServiceRow }
export { 
    ScreenDashboardProduct, ProductCreate, ScreenDashboardProductDetail,
     ScreenDashboardProductDetailUpdate, ProductRow 
    }
export { ScreenDashboardClient, ScreenDashboardClientDetailUpdate, ScreenDashboardClientDetail, ScreenDashboardClientCreate, ScreenDashboardClientRow }
export {
    Ticket, TicketRow, TicketCreate, TicketDetail,
    TicketDetailCalendar, TicketDetailCalendarPopupAdd, TicketDetailCalendarRow
}
// Route
export { Routes }
// All Reducers
export { allReducers }
// Setting
export { isDev, ITEMS_PER_PAGE }
// Utils
export {
    converErrorMessage, RequestService, Roles, GetRoleName,
    convertToSave, convertToSearch, pageNavigation, getLabelGender,
    convertTicketStatus, convertGender, convertStatus
}
// Actions
export { setUserInfo, logOut }
export { setBranch, createBranch, updateBranch, removeBranch, setBranchDetail }
export { createAlert, removeAlert }
export { setEmployee, createEmployee, setEmployeeDetail, updateEmployee }
export { setService, createService, updateService, removeService }
export { setProduct, updateProduct, createProduct, removeProduct }
export { setClient, createClient, setClientDetail, updateClient }
// Data
export { VietNamPlaces, medicalHistoryData }
// Store
export { Store }
// Services
export { AlertService }
export { ServiceService }
export { BranchService }
export { EmployeeService }
export { MainService }
export { ProductService }
export { ClientService }
export { UserService }
export { TicketService }
export { ConfirmService }