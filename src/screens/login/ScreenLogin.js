import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { CpnSvg, Background, UserService, CpnAlert, ScreenWraper } from '../../refs';

class ScreenLogin extends Component {
    render() {
        const checkAuth = UserService.checkAuth();

        // (1) Not have token in localStorage (Login)
        if (checkAuth === 1) return (
            <ScreenWraper title="Đăng nhập">
                <CpnAlert />
                <div id="screen-login">
                    <div className="background" style={{ background: `url("${Background}") no-repeat center center` }} />
                    <div className="filter" />
                    <div className="body">
                        <Formik
                            initialValues={{
                                loginInfo: '',
                                password: ''
                            }}
                            onSubmit={(values, { setSubmitting }) => {
                                UserService.login(values)
                                    .then(() => setSubmitting(false));
                            }}
                            render={props => {
                                const { isSubmitting } = props;

                                return <Form className="form">
                                    <div className="logo">
                                        <CpnSvg name="LOGO_WHITE" />
                                    </div>

                                    <div className="form-group icon no-label">
                                        <Field name="loginInfo" type="text" placeholder="Nhập email hoặc số điện thoại" />
                                        <CpnSvg name="USER" />
                                    </div>

                                    <div className="form-group icon no-label">
                                        <Field name="password" type="password" placeholder="Mật khẩu" />
                                        <CpnSvg name="PASSWORD" />
                                    </div>

                                    {isSubmitting ? <button type="submit" className="btn white w-100"> <div className="loading-icon"></div> </button> : null}
                                    {!isSubmitting ? <button type="submit" className="btn white w-100"> Đăng nhập </button> : null}

                                    <div className="form-sub-link">
                                        <div className="link">Quên mật khẩu!</div>
                                    </div>
                                </Form>
                            }}
                        />
                    </div>
                </div>

            </ScreenWraper>
        );

        // (2) Have token in localStorage || Not authen (Authentication -> check token)
        if (checkAuth === 2) return <Redirect to={{ pathname: '/authentication', state: { ...this.props.location.state } }} />
        // (3) Authen Success, Select place working (Select Branch)
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
export default connect(mapStateToProps)(ScreenLogin);