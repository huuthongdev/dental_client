import React, { Component, Fragment } from 'react';
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
// Import
import {
    Login, NotMatch404, Authentication, SelectBranch, Branch, Main,
    Employee, Service, Product, Client, BranchCreate, BranchDetail,
    EmployeeCreate, EmployeeDetail, ServiceDetail, ProductDetail, ClientCreate,
    ClientDetail, Store, Ticket, TicketCreate, TicketDetail
} from '../refs';
import { ServiceCreate, ProductCreate } from '../refs';
import { connect } from 'react-redux';

class Routes extends Component {
    render() {
        return (
            <Router>
                <Fragment>
                    <Switch>
                        <MustBeUser path="/" exact component={Main} />

                        <MustBeUser path="/branch" exact component={Branch} />
                        <MustBeUser path="/branch/new" exact component={BranchCreate} />
                        <MustBeUser path="/branch/:_id" exact component={BranchDetail} />

                        <MustBeUser path="/employee" exact component={Employee} />
                        <MustBeUser path="/employee/new" exact component={EmployeeCreate} />
                        <MustBeUser path="/employee/:_id" exact component={EmployeeDetail} />

                        <MustBeUser path="/service" exact component={Service} />
                        <MustBeUser path="/service/new" exact component={ServiceCreate} />
                        <MustBeUser path="/service/:_id" exact component={ServiceDetail} />

                        <MustBeUser path="/product" exact component={Product} />
                        <MustBeUser path="/product/new" exact component={ProductCreate} />
                        <MustBeUser path="/product/:_id" exact component={ProductDetail} />

                        <MustBeUser path="/client" exact component={Client} />
                        <MustBeUser path="/client/new" exact component={ClientCreate} />
                        <MustBeUser path="/client/:_id" exact component={ClientDetail} />

                        <MustBeUser path="/ticket" exact component={Ticket} />
                        <MustBeUser path="/ticket/new" exact component={TicketCreate} />
                        <MustBeUser path="/ticket/new/:idClient" exact component={TicketCreate} />
                        <MustBeUser path="/ticket/:_id" exact component={TicketDetail} />

                        <Route path="/login" exact component={Login} />
                        <Route path="/authentication" exact component={Authentication} />
                        <Route path="/select-branch" exact component={SelectBranch} />
                        <Route component={NotMatch404} />
                    </Switch>
                </Fragment>
            </Router>
        );
    }
}

const MustBeUser = ({ component: Component, ...rest }) => {
    const { user } = Store.getState();
    const token = localStorage.getItem("TOKEN");
    const currentBranch = localStorage.getItem("BRANCH");
    return (
        <Route {...rest} render={(props) => {
            if (!user._id && !token) return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            if (!user._id && token) return <Redirect to={{ pathname: '/authentication', state: { from: props.location } }} />
            if (user._id && token && !currentBranch) return <Redirect to={{ pathname: '/select-branch', state: { from: props.location } }} />
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
