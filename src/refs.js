// Images
import Logo from './assets/images/logo.svg';
import LogoBlue from './assets/images/logo-blue.svg';
import Background from './assets/images/bg.jpg';
import AvatarDemo from './assets/images/avatar.png';
// Components
import Svg from "./components/Svg";
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
// Screens
import Login from "./screens/Login";
import Dashboard from './screens/Dashboard';
import NotMatch404 from './screens/NotMatch404';
import Authentication from './screens/Authentication';
import SelectBranch from './screens/SelectBranch';
// Route
import Routes from "./routes/Routes";
// All Reducers
import { AllReducers } from "./reducers/index";
// Extension
import { isDev } from './setting';
// Utils
import { RequestService } from './utils/request-service';
import Roles from './utils/roles';
import GetRoleName from './utils/get-role-name';
// Actions
import { setUserInfo, logOut } from './actions/user.actions';
import { setBranch, createBranch, updateBranch } from './actions/branch.actions';
import { createAlert, removeAlert } from './actions/alert.actions';
import { setEmployee, createEmployee } from './actions/employee.actions';
import { loadData } from './actions/main.actions';

// ===================== EXPORT =====================
// Images
export { Logo, LogoBlue, AvatarDemo, Background }
// Components
export { FadeAnimate, Alert, AlertItem, Svg, TitleApp, Main, Header, Sidebar, Branch, BranchCreate, BranchRow, BranchDetail, Employee, EmployeeRow }
export { EmployeeCreate, BranchUpdate, BranchDetailEmployees }
// Screens
export { NotMatch404, Dashboard, Login, Authentication, SelectBranch }
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
export { setBranch, createBranch, updateBranch }
export { createAlert, removeAlert }
export { setEmployee, createEmployee }
export { loadData }