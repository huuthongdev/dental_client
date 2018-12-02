import React, { Component, Fragment } from 'react';
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
// Import
import { Login, NotMatch404, Authentication, SelectBranch, Branch, Main, Employee, Service, Product, Client, BranchCreate, BranchDetail, EmployeeCreate, EmployeeDetail, ServiceDetail, ProductDetail, ClientCreate, ClientDetail } from '../refs';
import { ServiceCreate, ProductCreate } from '../refs';
import { connect } from 'react-redux';

class Routes extends Component {
    render() {
        const { user } = this.props;
        return (
            <Router>
                <Fragment>
                    <Switch>
                        <MustBeUser user={user} path="/" exact component={Main} />

                        <MustBeUser user={user} path="/branch" exact component={Branch} />
                        <MustBeUser user={user} path="/branch/create" exact component={BranchCreate} />
                        <MustBeUser user={user} path="/branch/:_id" exact component={BranchDetail} />

                        <MustBeUser user={user} path="/employee" exact component={Employee} />
                        <MustBeUser user={user} path="/employee/create" exact component={EmployeeCreate} />
                        <MustBeUser user={user} path="/employee/:_id" exact component={EmployeeDetail} />

                        <MustBeUser user={user} path="/service" exact component={Service} />
                        <MustBeUser user={user} path="/service/create" exact component={ServiceCreate} />
                        <MustBeUser user={user} path="/service/:_id" exact component={ServiceDetail} />

                        <MustBeUser user={user} path="/product" exact component={Product} />
                        <MustBeUser user={user} path="/product/create" exact component={ProductCreate} />
                        <MustBeUser user={user} path="/product/:_id" exact component={ProductDetail} />

                        <MustBeUser user={user} path="/client" exact component={Client} />
                        <MustBeUser user={user} path="/client/create" exact component={ClientCreate} />
                        <MustBeUser user={user} path="/client/:_id" exact component={ClientDetail} />

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
    const { user } = rest;
    const token = localStorage.getItem("TOKEN");
    const currentBranch = localStorage.getItem("BRANCH");
    return (
        <Route {...rest} render={(props) => {
            if (user._id && currentBranch) return <Component  {...props} />
            if (!user._id && token) return <Redirect to={{ pathname: '/authentication', state: { from: props.location } }} />
            return <Redirect to='/login' />
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
