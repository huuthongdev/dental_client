import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Svg, Background, TitleApp, UserService, Alert } from '../refs';

class Login extends Component {
    state = {
        success: false,
        loading: false,
        error: null,
        userInfo: null
    }

    async handleSubmit(e) {
        e.preventDefault();
        this.setState({ loading: true });
        const loginInfo = this.refs.loginInfo.value;
        const password = this.refs.password.value;
        return UserService.login(loginInfo, password)
            .then(result => {
                if (result) return this.setState({ loading: false, success: true, userInfo: result })
                return this.setState({ loading: false });
            })
    }

    showLoadingButton() {
        const { loading } = this.state;
        if (loading) return <button type="submit" className="btn white w-100"> <div className="loading-icon"></div> </button>
        return <button type="submit" className="btn white w-100"> Đăng nhập </button>
    }

    showErrorMessage() {
        const { error } = this.state;
        let errorMessage;
        if (error === "Cannot read property 'data' of undefined") errorMessage = 'Không kết nối được hệ thống!'
        if (error !== "Cannot read property 'data' of undefined") errorMessage = 'Thông tin đăng nhập không chính xác!'
        if (error) return <p className="text-center text-white">Lỗi: {errorMessage}</p>
    }

    handleRedirect() {
        const { user } = this.props;
        const currentBranch = localStorage.getItem("BRANCH");
        const token = localStorage.getItem("TOKEN");
        if (user._id && currentBranch && token) return <Redirect to="/" />
        if (user._id && !currentBranch && token) return <Redirect to="/select-branch" />
    }

    render() {
        return (
            <Fragment>
                {this.handleRedirect()}
                <TitleApp sub="Login" />
                <Alert />
                <div id="screen-login">
                    <div className="background" style={{ background: `url("${Background}") no-repeat center center` }} />
                    <div className="filter" />
                    <div className="container-fluid">
                        <div className="row justify-content-center align-items-center">
                            <div className="col-sm-1 height-100vh" />
                            <div className="col-sm-3">
                                <form onClick={() => this.setState({ error: false })} onSubmit={(e) => this.handleSubmit(e)} className="form-white">
                                    <div className="logo">
                                        <Svg name="LOGO_WHITE" />
                                    </div>

                                    <div className="form-group icon no-label">
                                        <input ref="loginInfo" required type="text" placeholder="Nhập email hoặc số điện thoại" />
                                        <Svg name="USER" />
                                    </div>

                                    <div className="form-group icon no-label">
                                        <input ref="password" required type="password" placeholder="Mật khẩu" />
                                        <Svg name="PASSWORD" />
                                    </div>

                                    {this.showErrorMessage()}
                                    {this.showLoadingButton()}

                                    <div className="form-sub-link">
                                        <div className="link">Quên mật khẩu!</div>
                                    </div>
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
export default connect(mapStateToProps, null)(Login);