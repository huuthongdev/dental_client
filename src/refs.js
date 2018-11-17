// Images
import Logo from './assets/images/logo.svg';
import LogoBlue from './assets/images/logo-blue.svg';
import Background from './assets/images/bg.jpg';
import AvatarDemo from './assets/images/avatar.png';
// Components
import CpnWraper from './components/CpnWraper';
import Svg from "./components/Svg";
import ConfirmRemove from "./components/ConfirmRemove";
import FetchingData from "./components/FetchingData";
import FadeAnimate from "./components/FadeAnimate";
import TitleApp from './components/TitleApp';
import Header from './components/dashboard/Header';
import Sidebar from './components/dashboard/Sidebar';
import Branch from './components/dashboard/branch/Branch';
import BranchCreate from './components/dashboard/branch/BranchCreate';
import BranchDetail from './components/dashboard/branch/BranchDetail';
import BranchUpdate from './components/dashboard/branch/BranchUpdate';
import BranchDetailEmployees from './components/dashboard/branch/BranchDetailEmployees';
import BranchRow from './components/dashboard/branch/BranchRow';
import Main from './components/dashboard/main/Main';
import Alert from './components/alert/Alert';
import AlertItem from './components/alert/AlertItem';
import Employee from './components/dashboard/employee/Employee';
import EmployeeRow from './components/dashboard/employee/EmployeeRow';
import EmployeeCreate from './components/dashboard/employee/EmployeeCreate';
import EmployeeDetail from './components/dashboard/employee/EmployeeDetail';
import EmployeeUpdate from './components/dashboard/employee/EmployeeUpdate';
import Service from './components/dashboard/service/Service';
import ServiceCreate from './components/dashboard/service/ServiceCreate';
import ServiceRow from './components/dashboard/service/ServiceRow';
import ServiceUpdate from './components/dashboard/service/ServiceUpdate';
import Product from './components/dashboard/product/Product';
import ProductRow from './components/dashboard/product/ProductRow';
import ProductCreate from './components/dashboard/product/ProductCreate';
import ProductUpdate from './components/dashboard/product/ProductUpdate';
import Client from './components/dashboard/client/Client';
// Screens
import Login from "./screens/Login";
import NotMatch404 from './screens/NotMatch404';
import Authentication from './screens/Authentication';
import SelectBranch from './screens/SelectBranch';
// Route
import Routes from "./routes/Routes";
// All Reducers
import { AllReducers } from "./reducers/reducers";
// Extension
import { isDev } from './setting';
// Utils
import { RequestService } from './utils/request-service';
import Roles from './utils/roles';
import GetRoleName from './utils/get-role-name';
// Actions
import { setService, createService, updateService, removeService } from './actions/service.actions';
import { setUserInfo, logOut } from './actions/user.actions';
import { setBranch, createBranch, updateBranch, removeBranch, setBranchDetail } from './actions/branch.actions';
import { createAlert, removeAlert } from './actions/alert.actions';
import { setEmployee, createEmployee, setEmployeeDetail } from './actions/employee.actions';
import { setProduct, updateProduct, createProduct, removeProduct } from './actions/product.actions';
import { loadData, fetchTemp } from './actions/main.actions';
import { offConfirmRemove, onConfirmRemove } from './actions/confirm-remove.actions';

// ===================== EXPORT =====================
// Images
export { Logo, LogoBlue, AvatarDemo, Background }
// Components
export { Client, FetchingData, FadeAnimate, Alert, AlertItem, Svg, TitleApp, Main, Header, Sidebar, Branch, BranchCreate, BranchRow, BranchDetail, Employee, EmployeeRow }
export { EmployeeUpdate, EmployeeDetail, EmployeeCreate, BranchUpdate, BranchDetailEmployees, Service, ServiceCreate, ServiceRow, ServiceUpdate }
export { ConfirmRemove, Product, ProductRow, ProductCreate, ProductUpdate, CpnWraper }
// Screens
export { NotMatch404, Login, Authentication, SelectBranch }
// Route
export { Routes }
// All Reducers
export { AllReducers }
// Extension
export { isDev }
// Utils
export { RequestService, Roles, GetRoleName }
// Actions
export { setUserInfo, logOut }
export { setBranch, createBranch, updateBranch, removeBranch, setBranchDetail }
export { createAlert, removeAlert }
export { setEmployee, createEmployee, setEmployeeDetail }
export { setService, createService, updateService, removeService }
export { setProduct, updateProduct, createProduct, removeProduct }
export { loadData, fetchTemp }
export { offConfirmRemove, onConfirmRemove }