import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Background, RequestService, setUserInfo, TitleApp, Logo } from '../refs';
import { Redirect } from 'react-router-dom';

class Authentication extends Component {
    state = {
        error: false,
    }

    componentDidMount() {
        RequestService.get('/user/check')
            .then(result => {
                const { dispatch } = this.props;
                dispatch(setUserInfo(result));
                localStorage.setItem("TOKEN", result.token);
            })
            .catch(() => {
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
                <TitleApp sub="Authentication" />
                <div id="screen-fetching-data">
                    <div className="background" style={{ background: `url("${Background}") no-repeat center center` }} />
                    <div className="filter" />
                    <div className="container-fluid">
                        <div className="row justify-content-center align-items-center">
                            <div className="col-sm-1 height-100vh" />
                            <div className="col-sm-3">
                                <form>
                                    <div className="logo" style={{ marginBottom: '30px' }}>
                                        <img src={Logo} alt="Dental Application" />
                                    </div>
                                    <div className="loading-bar">
                                        <div className="percent"></div>
                                    </div>
                                    {/* <div className="form-sub-link" style={{ marginTop: 10 }}>
                                        <div>Đang xác thực...</div>
                                    </div> */}
                                </form>
                            </div>
                            <div className="col-sm-1" />
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