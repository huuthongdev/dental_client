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
import CpnFetchingData from "./components/CpnFetchingData";
import FadeAnimate from "./components/FadeAnimate";
import TitleApp from './components/TitleApp';
import CpnAlert from './components/alert/CpnAlert';
import CpnAlertItem from './components/alert/CpnAlertItem';
import CpnTitle from './components/CpnTitle';
import CpnEmptyValue from './components/CpnEmptyValue';
import CpnCurrencyInput from './components/CpnCurrencyInput';

// Screens
import ScreenWraper from './screens/ScreenWraper';
import ScreenLogin from "./screens/login/ScreenLogin";
import ScreenNotMatch404 from './screens/ScreenNotMatch404';
import ScreenAuthentication from './screens/authentication/ScreenAuthentication';
import ScreenSelectBranch from './screens/select-branch/ScreenSelectBranch';
import ScreenForgotPassword from './screens/forgot-password/ScreenForgotPassword';

import ScreenDashboardSidebar from './screens/dashboard/ScreenDashboardSidebar';
import ScreenDashboardHeader from './screens/dashboard/ScreenDashboardHeader';
import ScreenDashboardWraper from './screens/dashboard/ScreenDashboardWraper';

import ScreenDashboardMain from './screens/dashboard/main/ScreenDashboardMain';
import ScreenDashboardMainNumberReports from './screens/dashboard/main/ScreenDashboardMainNumberReports';
import ScreenDashboardCalendarsToday from './screens/dashboard/main/ScreenDashboardCalendarsToday';
import ScreenDashboardCalendarsTodayRow from './screens/dashboard/main/ScreenDashboardCalendarsTodayRow';
import ScreenDashboardMainTicketNotHaveCalendar from './screens/dashboard/main/ScreenDashboardMainTicketNotHaveCalendar';
import ScreenDashboardMainTicketNotHaveCalendarRow from './screens/dashboard/main/ScreenDashboardMainTicketNotHaveCalendarRow';

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
import ScreenDashboardEmployeeDetailRoles from './screens/dashboard/employee/detail/ScreenDashboardEmployeeDetailRoles';

import ScreenDashboardService from './screens/dashboard/service/ScreenDashboardService';
import ScreenDashboardServiceCreate from './screens/dashboard/service/ScreenDashboardServiceCreate';
import ScreenDashboardServiceRow from './screens/dashboard/service/ScreenDashboardServiceRow';
import ScreenDashboardServiceDetail from './screens/dashboard/service/detail/ScreenDashboardServiceDetail';
import ScreenDashboardServiceDetailUpdate from './screens/dashboard/service/detail/ScreenDashboardServiceDetailUpdate';

import ScreenDashboardProduct from './screens/dashboard/product/ScreenDashboardProduct';
import ScreenDashboardProductRow from './screens/dashboard/product/ScreenDashboardProductRow';
import ScreenDashboardProductCreate from './screens/dashboard/product/ScreenDashboardProductCreate';
import ScreenDashboardProductDetail from './screens/dashboard/product/detail/ScreenDashboardProductDetail';
import ScreenDashboardProductDetailUpdate from './screens/dashboard/product/detail/ScreenDashboardProductDetailUpdate';

import ScreenDashboardClient from './screens/dashboard/client/ScreenDashboardClient';
import ScreenDashboardClientCreate from './screens/dashboard/client/ScreenDashboardClientCreate';
import ScreenDashboardClientRow from './screens/dashboard/client/ScreenDashboardClientRow';
import ScreenDashboardClientDetailTickets from './screens/dashboard/client/detail/ScreenDashboardClientDetailTickets';
import ScreenDashboardClientDetailTicketsRow from './screens/dashboard/client/detail/ScreenDashboardClientDetailTicketsRow';
import ScreenDashboardClientReceiptVoucher from './screens/dashboard/client/detail/ScreenDashboardClientReceiptVoucher';

import ScreenDashboardClientDetail from './screens/dashboard/client/detail/ScreenDashboardClientDetail';
import ScreenDashboardClientDetailUpdate from './screens/dashboard/client/detail/ScreenDashboardClientDetailUpdate';

import ScreenDashboardTicket from './screens/dashboard/ticket/ScreenDashboardTicket';
import ScreenDashboardTicketRow from './screens/dashboard/ticket/ScreenDashboardTicketRow';
import ScreenDashboardTicketCreate from './screens/dashboard/ticket/ScreenDashboardTicketCreate';
import ScreenDashboardTicketDetail from './screens/dashboard/ticket/detail/ScreenDashboardTicketDetail';
import ScreenDashboardTicketDetailCalendar from './screens/dashboard/ticket/detail/ScreenDashboardTicketDetailCalendar';
import ScreenDashboardTicketDetailCalendarPopupAdd from './screens/dashboard/ticket/detail/ScreenDashboardTicketDetailCalendarPopupAdd';
import ScreenDashboardTicketDetailCalendarRow from './screens/dashboard/ticket/detail/ScreenDashboardTicketDetailCalendarRow';
import ScreenDashboardTicketDetailReceiptVoucher from './screens/dashboard/ticket/detail/ScreenDashboardTicketDetailReceiptVoucher';
import ScreenDashboardTicketDetailReceiptVoucherPopupAdd from './screens/dashboard/ticket/detail/ScreenDashboardTicketDetailReceiptVoucherPopupAdd';
import ScreenDashboardTicketDetailServicesInfo from './screens/dashboard/ticket/detail/ScreenDashboardTicketDetailServicesInfo';

import ScreenDashboardAccountant from './screens/dashboard/accountant/ScreenDashboardAccountant';
import ScreenDashboardAccountantReceiptVoucher from './screens/dashboard/accountant/receipt-voucher/ScreenDashboardAccountantReceiptVoucher';

// Print
import ReceiptVoucherPrint from './print/ReceiptVoucherPrint';

// Route
import Routes from "./routes/Routes";
// All Reducers
import allReducers from "./reducers";
// Setting
import { isDev, ITEMS_PER_PAGE, appVersion } from './setting';
import { calendarSetting } from './calendar-setting';
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
import TimeUtils from './utils/time.util';
import { formatPhoneNumber } from './utils/formatPhoneNumber.util';
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
import CalendarDentistService from './services/calendarDentist.service';
import ShortKeyService from './services/shortKey.service';
import ReceiptVoucherService from './services/receiptVoucher.service';
import CheckRoleService, { Role } from './services/checkRole.service';

// ===================== EXPORT =====================
// Images
export { Logo, LogoBlue, AvatarDemo, Background }
// Components
export {
    CpnTitle, CpnEmptyValue, CpnCurrencyInput,
    CpnFetchingData, FadeAnimate, CpnAlert, CpnAlertItem, CpnSvg, TitleApp,
    CpnPopupWraper, Confirm, SubmitButtonsGroup
}
// Screens
export { ScreenWraper }
export { ScreenLogin }
export { ScreenAuthentication }
export { ScreenSelectBranch }
export { ScreenForgotPassword }
export { ScreenNotMatch404 }
export { ScreenDashboardHeader, ScreenDashboardWraper, ScreenDashboardSidebar }
export {
    ScreenDashboardMain, ScreenDashboardMainNumberReports, ScreenDashboardCalendarsToday, ScreenDashboardCalendarsTodayRow,
    ScreenDashboardMainTicketNotHaveCalendar, ScreenDashboardMainTicketNotHaveCalendarRow
}
export {
    ScreenDashboardBranch, ScreenDashboardBranchRow, ScreenDashboardBranchDetailEmployeeAdd, ScreenDashboardBranchDetail,
    ScreenDashboardBranchCreate, ScreenDashboardBranchDetailUpdate, ScreenDashboardBranchDetailEmployees
}
export {
    ScreenDashboardEmployee, ScreenDashboardEmployeeCreate, ScreenDashboardEmployeeDetail,
    ScreenDashboardEmployeeRow, ScreenDashboardEmployeeDetailUpdate
}
export {
    ScreenDashboardService, ScreenDashboardServiceCreate, ScreenDashboardServiceDetail,
    ScreenDashboardServiceDetailUpdate, ScreenDashboardServiceRow
}
export {
    ScreenDashboardProduct, ScreenDashboardProductCreate, ScreenDashboardProductDetail,
    ScreenDashboardProductDetailUpdate, ScreenDashboardProductRow
}
export {
    ScreenDashboardClient, ScreenDashboardClientDetailUpdate, ScreenDashboardClientDetail,
    ScreenDashboardClientCreate, ScreenDashboardClientRow, ScreenDashboardClientDetailTickets, ScreenDashboardClientDetailTicketsRow,
    ScreenDashboardEmployeeDetailRoles, ScreenDashboardClientReceiptVoucher
}
export {
    ScreenDashboardTicket, ScreenDashboardTicketRow, ScreenDashboardTicketCreate, ScreenDashboardTicketDetail,
    ScreenDashboardTicketDetailCalendar, ScreenDashboardTicketDetailCalendarPopupAdd, ScreenDashboardTicketDetailCalendarRow,
    ScreenDashboardTicketDetailReceiptVoucher, ScreenDashboardTicketDetailReceiptVoucherPopupAdd,
    ScreenDashboardTicketDetailServicesInfo
}
export {
    ScreenDashboardAccountant, ScreenDashboardAccountantReceiptVoucher
}

// Print
export { ReceiptVoucherPrint }

// Route
export { Routes }
// All Reducers
export { allReducers }
// Setting
export { isDev, ITEMS_PER_PAGE, appVersion }
export { calendarSetting }
// Utils
export {
    converErrorMessage, RequestService, Roles, GetRoleName,
    convertToSave, convertToSearch, pageNavigation, getLabelGender,
    convertTicketStatus, convertGender, convertStatus,
    TimeUtils, formatPhoneNumber
}
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
export { CalendarDentistService }
export { ShortKeyService }
export { ReceiptVoucherService }
export { CheckRoleService, Role }