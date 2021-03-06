import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { CpnSvg, TitleApp, ScreenDashboardWraper, ProductService, CpnCurrencyInput } from '../../../refs';

class ScreenDashboardProductCreate extends Component {
    state = {
        goBack: false,
        redirectToDetail: null
    };

    render() {
        const { goBack, redirectToDetail } = this.state;
        if (goBack) return <Redirect to="/product" />;
        if (redirectToDetail) return <Redirect to={`/product`} />;

        return (
            <ScreenDashboardWraper>
                <TitleApp sub="Tạo sản phẩm" />
                <div className="cpn-form">
                    <div className="container-fluid mb-1">
                        <div className="row align-items-center">
                            <div className="col-sm-8">
                                <div className="cpn-form-title">
                                    <CpnSvg name="PRODUCT" />
                                    Thêm mới sản phẩm
                                </div>
                            </div>
                            <div className="col-sm-4 text-right">
                                <button onClick={() => this.setState({ goBack: true })} className="cpn-form-close">
                                    <CpnSvg name="CLOSE_FORM" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <Formik
                        initialValues={{
                            name: '',
                            suggestedRetailerPrice: '',
                            origin: '',
                            unit: '',
                            cost: ''
                        }}
                        validationSchema={Yup.object().shape({
                            name: Yup.string().required('Không được để trống'),
                            suggestedRetailerPrice: Yup.number().required('Không được để trống').min(0, 'Giá thấp nhất bằng 0'),
                            origin: Yup.string().required('Không được để trống'),
                            unit: Yup.string().required('Không được để trống'),
                            cost: Yup.number().min(0, 'Giá thấp nhất bằng 0')
                        })}
                        onSubmit={(values, { setSubmitting }) => {
                            ProductService.create(values)
                                .then(success => {
                                    if (!success) return setSubmitting(false);
                                    return this.setState({ goBack: true });
                                });
                        }}
                        render={props => {
                            const { isSubmitting, isValid, errors, touched, values, setFieldValue } = props;

                            return <Form>
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className={`form-group required ${errors.name && touched.name ? 'error' : ''}`}>
                                                <label>Tên dịch vụ:</label><span className="error-message">{errors.name}</span>
                                                <Field type="text" name="name" />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className={`form-group required ${errors.unit && touched.unit ? 'error' : ''}`}>
                                                <label>Đơn vị tính:</label><span className="error-message">{errors.unit}</span>
                                                <Field type="text" name="unit" list="unit" />
                                                <datalist id="unit">
                                                    <option value="Răng"></option>
                                                    <option value="Hàm"></option>
                                                    <option value="Combo"></option>
                                                    <option value="Lần"></option>
                                                </datalist>
                                            </div>
                                        </div>

                                        <div className="col-sm-6">
                                            <div className={`form-group ${errors.origin && touched.origin ? 'error' : ''}`}>
                                                <label>Xuất xứ:</label><span className="error-message">{errors.origin}</span>
                                                <Field type="text" name="origin" list="origin" />
                                                <datalist id="origin">
                                                    <option value="HCM">
                                                    </option><option value="Binh Thuan">
                                                    </option><option value="Can Tho">
                                                    </option>
                                                </datalist>
                                            </div>
                                        </div>

                                        <div className="col-sm-6">
                                            <div className={`form-group required ${errors.suggestedRetailerPrice && touched.suggestedRetailerPrice ? 'error' : ''}`}>
                                                <label>Giá đề xuất:</label><span className="error-message">{errors.suggestedRetailerPrice}</span>
                                                <CpnCurrencyInput value={values.suggestedRetailerPrice} onChange={number => setFieldValue('suggestedRetailerPrice', number)} />
                                            </div>
                                        </div>

                                        <div className="col-sm-6">
                                            <div className={`form-group ${errors.cost && touched.cost ? 'error' : ''}`}>
                                                <label>Giá cost:</label><span className="error-message">{errors.cost}</span>
                                                <CpnCurrencyInput value={values.cost} onChange={number => setFieldValue('cost', number)} />
                                            </div>
                                        </div>

                                        <div className="col-sm-6">
                                            {isSubmitting ? <button type="submit" className="btn blue">
                                                <div className="loading-icon" />
                                            </button> : null}

                                            {!isSubmitting ? <Fragment>
                                                <button disabled={!isValid} type="submit" className="btn blue">
                                                    Xác nhận
                                                </button>
                                                <button onClick={() => this.setState({ goBack: true })} className="btn outline-grey">
                                                    Huỷ
                                                </button>
                                            </Fragment> : null}
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        }}
                    />
                </div>
            </ScreenDashboardWraper>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        product: state.product
    };
}
export default connect(mapStateToProps)(ScreenDashboardProductCreate);