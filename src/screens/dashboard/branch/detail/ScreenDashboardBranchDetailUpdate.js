import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import Select from 'react-select';
import { BranchService, VietNamPlaces, convertToSave } from '../../../../refs';

class ScreenDashboardBranchDetailUpdate extends Component {
    render() {
        const { name, phone, city, district, address, email, _id } = this.props.item;
        return (
            <Fragment>
                <div className="col-sm-12">
                    <div className="cpn-form">
                        <Formik
                            initialValues={{
                                name: convertToSave(name, name, ''),
                                email: convertToSave(email, email, ''),
                                phone: convertToSave(phone, phone, ''),
                                city: convertToSave(city, city, ''),
                                district: convertToSave(district, district, ''),
                                address: convertToSave(address, address, ''),
                            }}
                            validationSchema={Yup.object().shape({
                                name: Yup.string().required('Không được để trống'),
                                email: Yup.string().required('Không được để trống').email('Không đúng định dạng email'),
                                phone: Yup.string().required('Không được để trống').min(10, 'Số điện thoại không hợp lệ.').max(10, 'Số điện thoại không hợp lệ.'),
                                city: Yup.string().required('Không được để trống'),
                                district: Yup.string().required('Không được để trống'),
                                address: Yup.string().required('Không được để trống')
                            })}
                            onSubmit={(values, { setSubmitting, resetForm }) => {
                                BranchService.update(_id, values)
                                    .then(() => {
                                        setSubmitting(false);
                                        resetForm();
                                    })
                            }}
                            render={props => {
                                const { isSubmitting, isValid, errors, touched, setValues, values, setTouched, dirty } = props;

                                const VietNamPlacesArr = Object.values(VietNamPlaces);
                                const citysArr = VietNamPlacesArr.map(v => v = { label: v.name, value: v.name });
                                const districtsArr = values.city ?
                                    Object.values(VietNamPlacesArr.find(v => v.name === values.city).districts).map(v => v = { label: v, value: v })
                                    : [];

                                return <Form id="update-branch-form">
                                    <div className="container-fluid">
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className={`form-group required ${errors.name && touched.name ? 'error' : ''}`}>
                                                    <label>Tên:</label><span className="error-message">{errors.name}</span>
                                                    <Field type="text" name="name" />
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className={`form-group required ${errors.city && touched.city ? 'error' : ''}`}>
                                                    <label>Thành phố:</label><span className="error-message">{errors.city}</span>
                                                    <Select
                                                        defaultValue={{ label: values.city, value: values.city }}
                                                        options={citysArr}
                                                        className="select"
                                                        classNamePrefix="react-select"
                                                        onChange={value => {
                                                            setValues({ ...values, city: value.label, district: '' });
                                                        }}
                                                        isSearchable
                                                        onBlur={() => setTouched({ ...touched, city: true })}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className={`form-group required ${errors.district && touched.district ? 'error' : ''}`}>
                                                    <label>Quận/huyện:</label><span className="error-message">{errors.district}</span>
                                                    <Select
                                                        placeholder={`${values.city ? '-- Chọn --' : 'Chọn thành phố trước'}`}
                                                        value={values.city && values.district ? { label: values.district, value: values.district } : null}
                                                        options={districtsArr}
                                                        className="select"
                                                        classNamePrefix="react-select"
                                                        onChange={value => {
                                                            setValues({ ...values, district: value.label });
                                                        }}
                                                        isSearchable
                                                        onBlur={() => setTouched({ ...touched, district: true })}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className={`form-group required ${errors.address && touched.address ? 'error' : ''}`}>
                                                    <label>Số - Tên đường:</label><span className="error-message">{errors.address}</span>
                                                    <Field type="text" name="address" />
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className={`form-group required ${errors.email && touched.email ? 'error' : ''}`}>
                                                    <label>Email:</label><span className="error-message">{errors.email}</span>
                                                    <Field type="text" name="email" />
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className={`form-group required ${errors.phone && touched.phone ? 'error' : ''}`}>
                                                    <label>Điện thoại chính:</label><span className="error-message">{errors.phone}</span>
                                                    <Field type="text" name="phone" />
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
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        branch: state.branch
    };
}
export default connect(mapStateToProps, null)(ScreenDashboardBranchDetailUpdate);