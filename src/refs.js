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
import BranchRow from './components/dashboard/branch/BranchRow';
import Main from './components/dashboard/main/Main';
import Alert from './components/alert/Alert';
import AlertItem from './components/alert/AlertItem';
// Screens
import Login from "./screens/Login";
import Dashboard from './screens/Dashboard';
import NotMatch404 from './screens/NotMatch404';
import Authentication from './screens/Authentication';
// Route
import Routes from "./routes/Routes";
// All Reducers
import { AllReducers } from "./reducers/index";
// Extension
import { isDev } from './setting';
// Utils
import { RequestService } from './utils/request-service';
// Actions
import { setUserInfo, logOut } from './actions/user.actions';
import { setBranch, addBranch } from './actions/branch.actions';
import { createAlert, removeAlert } from './actions/alert.actions';

// ===================== EXPORT =====================
// Images
export { Logo, LogoBlue, AvatarDemo, Background }
// Components
export { FadeAnimate, Alert, AlertItem, Svg, TitleApp, Main, Header, Sidebar, Branch, BranchCreate, BranchRow, BranchDetail }
// Screens
export { NotMatch404, Dashboard, Login, Authentication }
// Route
export { Routes }
// All Reducers
export { AllReducers }
// Extension
export { isDev }
// Utils
export { RequestService }
// Actions
export { setUserInfo, logOut }
export { setBranch, addBranch }
export { createAlert, removeAlert }
