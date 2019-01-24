import React, { Component, Fragment } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { connect } from 'react-redux';
import { Redirect, Link } from "react-router-dom";
import { CpnSvg, convertToSave, ServiceService } from '../../../../refs';

class ScreenDashboardServiceDetailUpdate extends Component {
    state = {
        redirectToService: false
    }

    render() {
        const item = this.props.service.filter(v => v._id === this.props.item._id)[0];

        if (this.state.redirectToService) return <Redirect to="/service" />
        return (
            <div className="cpn-form">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-sm-8">
                            <div className="cpn-form-title">
                                <CpnSvg name="SERVICE" />
                                Chỉnh sửa dịch vụ
                            </div>
                        </div>
                        <div className="col-sm-4 text-right">
                            <button onClick={() => this.setState({ redirectToService: true })} className="cpn-form-close">
                                <CpnSvg name="CLOSE_FORM" />
                            </button>
                        </div>
                    </div>
                </div>
                <Formik
                    initialValues={{
                        name: convertToSave(item.name),
                        suggestedRetailerPrice: convertToSave(item.suggestedRetailerPrice),
                        unit: convertToSave(item.unit)
                    }}
                    validationSchema={Yup.object().shape({
                        name: Yup.string().required('Không được để trống'),
                        suggestedRetailerPrice: Yup.number().required('Không được để trống').min(1000, 'Giá thấp nhất 1.000đ'),
                        unit: Yup.string().required('Không được để trống')
                    })}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        ServiceService.update(item._id, values)
                            .then(() => {
                                setSubmitting(false);
                                resetForm();
                            })
                    }}
                    render={props => {
                        const { isSubmitting, isValid, errors, touched, values, dirty } = props;

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
                                        <div className={`form-group required format-money-wraper ${errors.suggestedRetailerPrice && touched.suggestedRetailerPrice ? 'error' : ''}`}>
                                            <label>Giá đề xuất:</label><span className="error-message">{errors.suggestedRetailerPrice}</span>
                                            <span className="format-money">{`${values.suggestedRetailerPrice !== 0 ? values.suggestedRetailerPrice.toLocaleString() : ''}`}</span>
                                            <Field type="number" name="suggestedRetailerPrice" />
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
                                        {isSubmitting ? <button type="submit" className="btn blue">
                                            <div className="loading-icon" />
                                        </button> : null}

                                        {!isSubmitting ? <Fragment>
                                            <button disabled={!isValid || !dirty} type="submit" className="btn blue">
                                                Xác nhận
                                            </button>
                                            <Link to="/service">
                                                <button type="button" className="btn outline-grey">
                                                    Huỷ
                                                </button>
                                            </Link>
                                        </Fragment> : null}
                                    </div>
                                </div>
                            </div>
                        </Form>
                    }}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        service: state.service
    };
}
export default connect(mapStateToProps)(ScreenDashboardServiceDetailUpdate);