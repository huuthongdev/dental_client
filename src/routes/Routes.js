import React, { Component, Fragment } from 'react';
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
// Import
import { Login, NotMatch404, Authentication, Branch, Main, Employee, SelectBranch } from '../refs';
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
                        <MustBeUser user={user} path="/employee" exact component={Employee} />
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
            if (token) return <Redirect to={{ pathname: '/authentication', state: { from: props.location } }} />
            return <Redirect to='/login' />
        }} />
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
}
export default connect(mapStateToProps, null)(Routes);
