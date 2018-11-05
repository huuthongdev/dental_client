// Images
import Logo from './assets/images/logo.svg';
import LogoBlue from './assets/images/logo-blue.svg';
import Background from './assets/images/bg.jpg';
import AvatarDemo from './assets/images/avatar.png';
// Components
import Svg from "./components/Svg";
import TitleApp from './components/TitleApp';
import Header from './components/dashboard/Header';
import Sidebar from './components/dashboard/Sidebar';
import Branch from './components/dashboard/branch/Branch';
import Main from './components/dashboard/main/Main';
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

// ===================== EXPORT =====================
// Images
export { Logo, LogoBlue, AvatarDemo, Background }
// Components
export { Svg, TitleApp, Header, Sidebar, Branch, Main }
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
