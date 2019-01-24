import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Background, Logo, UserService, ScreenWraper } from '../../refs';
import { Redirect } from 'react-router-dom';

class ScreenAuthentication extends Component {
    state = {
        fetching: true
    }

    componentDidMount() {
        UserService.authentication()
            .then(success => {
                if (success) return;
                this.setState({ fetching: false });
            });
    }

    render() {
        const checkAuth = UserService.checkAuth();

        if (checkAuth === 1) return <Redirect to={{ pathname: '/login', state: { ...this.props.location.state } }} />
        // (2) Have token in localStorage || Not authen (Authentication -> check token)
        if (checkAuth === 2) return <ScreenWraper title="Đang xác thực">
            <div id="screen-fetching-data">
                <div className="background" style={{ background: `url("${Background}") no-repeat center center` }} />
                <div className="filter" />
                <div className="body">
                    <div className="logo" style={{ marginBottom: '30px' }}>
                        <img src={Logo} alt="Dental Application" />
                    </div>
                    <div className="loading-bar">
                        <div className="percent"></div>
                    </div>
                </div>
            </div>
        </ScreenWraper>
        // (3) Authen Success, Select place working (Select branch)
        if (checkAuth === 3) return <Redirect to={{ pathname: '/select-branch', state: { ...this.props.location.state } }} />
        // (4) Authen completed (Success)
        const { state } = this.props.location;
        if (checkAuth === 4) return <Redirect to={state && state.from && state.from.pathname ? state.from.pathname : '/'} />
        return <Fragment />;
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
}
export default connect(mapStateToProps)(ScreenAuthentication);