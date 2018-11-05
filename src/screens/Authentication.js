import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Background, RequestService, setUserInfo, TitleApp } from '../refs';
import { Redirect } from 'react-router-dom';

class Authentication extends Component {
    state = {
        error: false,
    }

    async componentDidMount() {
        await RequestService.get('/user/check')
            .then(result => {
                const { dispatch } = this.props;
                dispatch(setUserInfo(result));
                localStorage.setItem("TOKEN", result.token);
            })
            .catch(error => {
                localStorage.removeItem("TOKEN");
                this.setState({ error: true });
            });
    }

    onRedirectToLogin() {
        const { error } = this.state;
        if (error) return <Redirect to="/login" />
    }

    onRedirectToCurrentNav() {
        const { user } = this.props;
        if (user._id) return <Redirect to={this.props.location.state.from.pathname} />
    }

    render() {
        return (
            <Fragment>
                {this.onRedirectToLogin()}
                {this.onRedirectToCurrentNav()}
                <TitleApp sub="Authentication"/>
                <div id="screen-login">
                    <div className="background" style={{ background: `url("${Background}") no-repeat center center` }} />
                    <div className="filter" />
                    <div className="container-fluid">
                        <div className="row justify-content-center align-items-center">
                            <div className="col-sm-6">
                                Authenciation
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
}
export default connect(mapStateToProps, null)(Authentication);