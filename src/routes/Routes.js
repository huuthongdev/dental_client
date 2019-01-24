import React, { Component, Fragment } from 'react';
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
// Import
import {
    ScreenLogin, ScreenNotMatch404, ScreenAuthentication, ScreenSelectBranch, ScreenDashboardBranch, ScreenDashboardMain,
    ScreenDashboardEmployee, ScreenDashboardService, ScreenDashboardProduct, ScreenDashboardClient, ScreenDashboardBranchCreate, ScreenDashboardBranchDetail,
    ScreenDashboardEmployeeCreate, ScreenDashboardEmployeeDetail, ScreenDashboardServiceDetail, ScreenDashboardProductDetail, ScreenDashboardClientCreate,
    ScreenDashboardClientDetail, ScreenDashboardTicket, ScreenDashboardTicketCreate, ScreenDashboardTicketDetail, UserService, ScreenDashboardAccountant
} from '../refs';
import { ScreenDashboardServiceCreate, ScreenDashboardProductCreate } from '../refs';
import { connect } from 'react-redux';
import PrinTest from '../print/PrinTest';

class Routes extends Component {
    render() {
        return (
            <Router>
                <Fragment>
                    <Switch>
                        <MustBeUser path="/" exact component={ScreenDashboardMain} />

                        <MustBeUser path="/branch" exact component={ScreenDashboardBranch} />
                        <MustBeUser path="/branch/new" exact component={ScreenDashboardBranchCreate} />
                        <MustBeUser path="/branch/:_id" exact component={ScreenDashboardBranchDetail} />

                        <MustBeUser path="/employee" exact component={ScreenDashboardEmployee} />
                        <MustBeUser path="/employee/new" exact component={ScreenDashboardEmployeeCreate} />
                        <MustBeUser path="/employee/:_id" exact component={ScreenDashboardEmployeeDetail} />

                        <MustBeUser path="/service" exact component={ScreenDashboardService} />
                        <MustBeUser path="/service/new" exact component={ScreenDashboardServiceCreate} />
                        <MustBeUser path="/service/:_id" exact component={ScreenDashboardServiceDetail} />

                        <MustBeUser path="/product" exact component={ScreenDashboardProduct} />
                        <MustBeUser path="/product/new" exact component={ScreenDashboardProductCreate} />
                        <MustBeUser path="/product/:_id" exact component={ScreenDashboardProductDetail} />

                        <MustBeUser path="/client" exact component={ScreenDashboardClient} />
                        <MustBeUser path="/client/new" exact component={ScreenDashboardClientCreate} />
                        <MustBeUser path="/client/:_id" exact component={ScreenDashboardClientDetail} />

                        <MustBeUser path="/ticket" exact component={ScreenDashboardTicket} />
                        <MustBeUser path="/ticket/new" exact component={ScreenDashboardTicketCreate} />
                        <MustBeUser path="/ticket/new/:idClient" exact component={ScreenDashboardTicketCreate} />
                        <MustBeUser path="/ticket/:_id" exact component={ScreenDashboardTicketDetail} />

                        <MustBeUser path="/accountant" exact component={ScreenDashboardAccountant} />

                        <Route path="/login" exact component={ScreenLogin} />
                        <Route path="/authentication" exact component={ScreenAuthentication} />
                        <Route path="/select-branch" exact component={ScreenSelectBranch} />

                        <Route path="/receipt-voucher-print-review" exact component={PrinTest} />
                        <Route component={ScreenNotMatch404} />
                    </Switch>
                </Fragment>
            </Router>
        );
    }
}

const MustBeUser = ({ component: Component, ...rest }) => {
    const checkAuth = UserService.checkAuth();
    return (
        <Route {...rest} render={(props) => {
            // (1) Not have token in localStorage (Login)
            if (checkAuth === 1) return <Redirect to={{ pathname: '/login', state: { from: { pathname: `${props.location.pathname}${props.location.search}` } } }} />;
            // (2) Have token in localStorage || Not authen (Authentication -> check token)
            if (checkAuth === 2) return <Redirect to={{ pathname: '/authentication', state: { from: { pathname: `${props.location.pathname}${props.location.search}` } } }} />;
            // (3) Authen Success, Select place working (Select Place)
            if (checkAuth === 3) return <Redirect to={{ pathname: '/select-branch', state: { from: { pathname: `${props.location.pathname}${props.location.search}` } } }} />
            // (4) Authen completed (Success)
            return <Component  {...props} />
        }} />
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        fetchDataStatus: state.fetchDataStatus
    };
}
export default connect(mapStateToProps, null)(Routes);
