import React, { Component, Fragment } from 'react';
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
// Import
import { Login, NotMatch404, Authentication, Branch, Main } from '../refs';
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
                        <Route path="/login" component={Login} />
                        <Route path="/authentication" component={Authentication} />
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
    return (
        <Route {...rest} render={(props) => {
            if (user._id) return <Component  {...props} />
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
