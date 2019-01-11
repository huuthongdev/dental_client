// Images
import Logo from './assets/images/logo.svg';
import LogoBlue from './assets/images/logo-blue.svg';
import Background from './assets/images/bg.jpg';
import AvatarDemo from './assets/images/avatar.png';
// Components
import SubmitButtonsGroup from './components/SubmitButtonsGroup';
import CpnWraper from './components/CpnWraper';
import CpnPopupWraper from './components/CpnPopupWraper';
import Svg from "./components/Svg";
import Confirm from "./components/Confirm";
import FetchingData from "./components/FetchingData";
import FadeAnimate from "./components/FadeAnimate";
import TitleApp from './components/TitleApp';
import Alert from './components/alert/Alert';
import AlertItem from './components/alert/AlertItem';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
// Screens
import Login from "./screens/Login";
import NotMatch404 from './screens/NotMatch404';
import Authentication from './screens/Authentication';
import SelectBranch from './screens/SelectBranch';

import Main from './screens/dashboard/main/Main';

import Branch from './screens/dashboard/branch/Branch';
import BranchCreate from './screens/dashboard/branch/BranchCreate';
import BranchDetail from './screens/dashboard/branch/BranchDetail';
import BranchUpdate from './screens/dashboard/branch/BranchUpdate';
import BranchDetailEmployees from './screens/dashboard/branch/BranchDetailEmployees';
import BranchAddEmployee from './screens/dashboard/branch/BranchAddEmployee';
import BranchRow from './screens/dashboard/branch/BranchRow';


import Employee from './screens/dashboard/employee/Employee';
import EmployeeRow from './screens/dashboard/employee/EmployeeRow';
import EmployeeCreate from './screens/dashboard/employee/EmployeeCreate';
import EmployeeDetail from './screens/dashboard/employee/EmployeeDetail';
import EmployeeUpdate from './screens/dashboard/employee/EmployeeUpdate';

import Service from './screens/dashboard/service/Service';
import ServiceCreate from './screens/dashboard/service/ServiceCreate';
import ServiceRow from './screens/dashboard/service/ServiceRow';
import ServiceDetail from './screens/dashboard/service/ServiceDetail';
import ServiceUpdate from './screens/dashboard/service/ServiceUpdate';

import Product from './screens/dashboard/product/Product';
import ProductRow from './screens/dashboard/product/ProductRow';
import ProductCreate from './screens/dashboard/product/ProductCreate';
import ProductUpdate from './screens/dashboard/product/ProductUpdate';
import ProductDetail from './screens/dashboard/product/ProductDetail';

import Client from './screens/dashboard/client/Client';
import ClientCreate from './screens/dashboard/client/ClientCreate';
import ClientRow from './screens/dashboard/client/ClientRow';

import ClientDetail from './screens/dashboard/client/ClientDetail';
import ClientUpdate from './screens/dashboard/client/ClientUpdate';

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
    FetchingData, FadeAnimate, Alert, AlertItem, Svg, TitleApp, Header, Sidebar,
    CpnWraper, CpnPopupWraper, Confirm, SubmitButtonsGroup
}
// Screens
export { NotMatch404, Login, Authentication, SelectBranch }
export { Main }
export { Branch, BranchRow, BranchAddEmployee, BranchDetail, BranchCreate, BranchUpdate, BranchDetailEmployees }
export { Employee, EmployeeCreate, EmployeeDetail, EmployeeRow, EmployeeUpdate }
export { Service, ServiceCreate, ServiceDetail, ServiceUpdate, ServiceRow }
export { Product, ProductCreate, ProductDetail, ProductUpdate, ProductRow }
export { Client, ClientUpdate, ClientDetail, ClientCreate, ClientRow }
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