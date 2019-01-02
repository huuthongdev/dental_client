import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { Svg, createService, CpnWraper, TitleApp, ServiceService } from '../../../refs';

class ServiceCreate extends Component {
    state = {
        loading: false,
        goBack: false,
        redirectToDetail: null
    };

    componentDidMount() {
        document.onkeyup = (e) => {
            if (e.which === 27) return this.setState({ goBack: true });
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        let { name, suggestedRetailerPrice, unit } = this.refs;
        name = name.value; suggestedRetailerPrice = suggestedRetailerPrice.value; unit = unit.value;
        this.setState({ loading: true });
        const { dispatch } = this.props;
        dispatch(createService(
            { name, suggestedRetailerPrice, unit },
            () => this.setState({ loading: false }),
            _id => this.setState({ redirectToDetail: _id })
        ))
    }

    render() {
        const { goBack, redirectToDetail } = this.state;
        if (goBack) return <Redirect to="/service" />;
        if (redirectToDetail)
            return <Redirect to={`/service`} />;
        return (
            <CpnWraper>
                <TitleApp sub="Tạo dịch vụ" />
                <div className="cpn-form">
                    <div className="container-fluid">
                        <div className="row align-items-center">
                            <div className="col-sm-8">
                                <div className="cpn-form-title">
                                    <Svg name="SERVICE" />
                                    Thêm mới dịch vụ
                            </div>
                            </div>
                            <div className="col-sm-4 text-right">
                                <button onClick={() => this.setState({ goBack: true })} className="cpn-form-close">
                                    <Svg name="CLOSE_FORM" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <Formik
                        initialValues={{
                            name: '',
                            suggestedRetailerPrice: '',
                            unit: ''
                        }}
                        validationSchema={Yup.object().shape({
                            name: Yup.string().required('Không được để trống'),
                            suggestedRetailerPrice: Yup.number().required('Không được để trống').min(1000, 'Giá thấp nhất 1.000đ'),
                            unit: Yup.string().required('Không được để trống')
                        })}
                        onSubmit={(values, { setSubmitting }) => {
                            ServiceService.create(values)
                            .then(success => {
                                if (success) return this.setState({ goBack: true });
                                return setSubmitting(false);
                            })
                        }}
                        render={props => {
                            const { isSubmitting, isValid, errors, touched, values } = props;

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
            </CpnWraper>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        service: state.service
    };
}
export default connect(mapStateToProps, null)(ServiceCreate);