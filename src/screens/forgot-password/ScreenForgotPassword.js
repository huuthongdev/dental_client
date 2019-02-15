import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { Background, CpnSvg, UserService, CpnAlert } from '../../refs';

class ScreenForgotPassword extends Component {
    state = {
        PIN: false,
        errorPIN: null,
        validateStatus: false,
        success: false,
        loadingValidatePIN: false
    }

    validatePin = (e) => {
        const value = e.target.value;
        if (!value || value.length !== 6) return;
        this.setState({ loadingValidatePIN: true });
        UserService.checkCodePin(value)
            .then(result => {
                console.log(result);
                if (result) return this.setState({ loadingValidatePIN: false, PIN: value, validateStatus: true });
                return this.setState({ loadingValidatePIN: false, validateStatus: false });
            })
    }

    render() {
        const { PIN, errorPIN, validateStatus, success, loadingValidatePIN } = this.state;

        function equalTo(ref, msg) {
            return Yup.mixed().test({
                name: 'equalTo',
                exclusive: false,
                message: msg || '',
                params: {
                    reference: ref.path,
                },
                test: function (value) {
                    return value === this.resolve(ref);
                },
            });
        }
        Yup.addMethod(Yup.string, 'equalTo', equalTo);

        if (success) return <Fragment>
            <CpnAlert />
            <div id="screen-forgot-password">
                <div className="background" style={{ background: `url("${Background}") no-repeat center center` }} />
                <div className="filter" />
                <div className="body">
                    <div className="logo">
                        <CpnSvg name="LOGO_WHITE" />
                    </div>

                    <div className="title">
                        Cập nhật mật khẩu thành công!
                    </div>

                    <div className="form text-center">
                        <Link to="/login">
                            <button className="btn white">
                                Đăng nhập
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </Fragment>

        if (validateStatus) return <Fragment>
            <CpnAlert />
            <div id="screen-forgot-password">
                <div className="background" style={{ background: `url("${Background}") no-repeat center center` }} />
                <div className="filter" />
                <div className="body">
                    <div className="logo">
                        <CpnSvg name="LOGO_WHITE" />
                    </div>

                    <div className="title">
                        Khôi phục mật khẩu
                    </div>

                    <Formik
                        initialValues={{
                            password: '',
                            confirmPassword: ''
                        }}
                        validationSchema={Yup.object().shape({
                            password: Yup.string().required('cần được bổ sung'),
                            confirmPassword: Yup.string().required('cần được bổ sung').equalTo(Yup.ref('password'), 'không trùng khớp')
                        })}
                        onSubmit={(values, { setSubmitting }) => {
                            UserService.changePasswordWithPinCode(PIN, values.confirmPassword)
                                .then(result => {
                                    setSubmitting(false);
                                    if (result) return this.setState({ success: true });
                                });
                        }}
                        render={props => {
                            const { isSubmitting } = props;
                            return <Form className="form">
                                <div className="form-group icon no-label">
                                    <Field name="password" type="password" placeholder="Mật khẩu mới" autoComplete="nope" />
                                    {/* <CpnSvg name="LOCK" /> */}
                                </div>

                                <div className="form-group icon no-label">
                                    <Field name="confirmPassword" type="password" autoComplete="nope" placeholder="Xác thực mật khẩu" />
                                    {/* <CpnSvg name="USER" /> */}
                                </div>

                                {isSubmitting ? <button type="submit" className="btn white w-100"> <div className="loading-icon"></div> </button> : null}
                                {!isSubmitting ? <button type="submit" className="btn white w-100"> Xác nhận </button> : null}
                            </Form>
                        }}
                    />
                </div>
            </div>
        </Fragment>

        if (PIN) return <Fragment>
            <CpnAlert />
            <div id="screen-forgot-password">
                <div className="background" style={{ background: `url("${Background}") no-repeat center center` }} />
                <div className="filter" />
                <div className="body">
                    <div className="logo">
                        <CpnSvg name="LOGO_WHITE" />
                    </div>

                    {!loadingValidatePIN ? <Fragment>
                        <div className="description">
                            Kiểm tra Email & Nhập mã PIN được cung cấp
                        </div>

                        <div className="form">
                            <div className="form-group">
                                <input onChange={this.validatePin} type="text" placeholder="Mã PIN" />
                            </div>
                            {errorPIN ? <div className="error-message" style={{ textAlign: 'center', color: 'white' }}>
                                Lỗi: {errorPIN}
                            </div> : null}
                        </div>
                    </Fragment> : null}

                    {loadingValidatePIN ? <Fragment>
                        <div className="loading-fetching-data white">
                            <div className="loading-icon"></div>
                            Đang kiểm tra mã PIN...
                        </div>
                    </Fragment> : null}


                </div>
            </div>
        </Fragment>

        return (
            <Fragment>
                <CpnAlert />
                <div id="screen-forgot-password">
                    <div className="background" style={{ background: `url("${Background}") no-repeat center center` }} />
                    <div className="filter" />
                    <div className="body">
                        <div className="logo">
                            <CpnSvg name="LOGO_WHITE" />
                        </div>

                        <div className="title">
                            Quên mật khẩu
                        </div>

                        <Formik
                            initialValues={{
                                email: ''
                            }}
                            validationSchema={Yup.object().shape({
                                email: Yup.string().email('Email không hợp lệ').required('Email cần được cung cấp')
                            })}
                            onSubmit={(values, { setSubmitting }) => {
                                UserService.suggestForgotPassword(values.email)
                                    .then(codePIN => {
                                        setSubmitting(false);
                                        this.setState({ PIN: +codePIN });
                                    })
                            }}
                            render={props => {
                                const { isSubmitting } = props;
                                return <Form className="form">
                                    <div className="form-group icon no-label">
                                        <Field name="email" type="text" placeholder="Nhập email của bạn" />
                                        <CpnSvg name="USER" />
                                    </div>

                                    {isSubmitting ? <button type="submit" className="btn white w-100"> <div className="loading-icon"></div> </button> : null}
                                    {!isSubmitting ? <button type="submit" className="btn white w-100"> Gửi yêu cầu </button> : null}
                                </Form>
                            }}
                        />
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default ScreenForgotPassword;