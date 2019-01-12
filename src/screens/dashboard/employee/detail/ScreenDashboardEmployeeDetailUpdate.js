import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { EmployeeService, VietNamPlaces, convertToSave } from '../../../../refs';
import * as Yup from 'yup';
import { Formik, Form, Field } from "formik";
import DatePicker from "react-datepicker";
import Select from 'react-select'

class ScreenDashboardEmployeeDetailUpdate extends Component {
    render() {
        const { item } = this.props;

        return (
            <Fragment>
                <div className="col-sm-12">
                    <div className="cpn-form">
                        <Formik
                            initialValues={{
                                name: convertToSave(item.name, item.name, ''),
                                email: convertToSave(item.email, item.email, ''),
                                birthday: convertToSave(item.birthday, new Date(item.birthday), ''),
                                city: convertToSave(item.city, item.city, ''),
                                district: convertToSave(item.district, item.district, ''),
                                address: convertToSave(item.address, item.address, ''),
                                phone: convertToSave(item.phone, item.phone, ''),
                                homeTown: convertToSave(item.homeTown, item.homeTown, '')
                            }}
                            validationSchema={Yup.object().shape({
                                name: Yup.string().required('Không được để trống'),
                                email: Yup.string().required('Không được để trống').email('Không đúng định dạng email'),
                                birthday: Yup.string(),
                                city: Yup.string().required('Không được để trống'),
                                district: Yup.string().required('Không được để trống'),
                                address: Yup.string().required('Không được để trống'),
                                phone: Yup.string().required('Không được để trống').min(10, 'Số điện thoại không hợp lệ.').max(10, 'Số điện thoại không hợp lệ.'),
                                homeTown: Yup.string()
                            })}
                            onSubmit={(values, { setSubmitting, resetForm }) => {
                                EmployeeService.update(item._id, { ...values, birthday: new Date(values.birthday).getTime() })
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

                                return <Form>
                                    <div className="container-fluid">
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <div className={`form-group required ${errors.name && touched.name ? 'error' : ''}`}>
                                                    <label>Tên:</label><span className="error-message">{errors.name}</span>
                                                    <Field type="text" name="name" />
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
                                                    <label>Điện thoại:</label><span className="error-message">{errors.phone}</span>
                                                    <Field type="text" name="phone" />
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className={`form-group ${errors.birthday && touched.birthday ? 'error' : ''}`}>
                                                    <label>Ngày sinh:</label><span className="error-message">{errors.birthday}</span>
                                                    <DatePicker
                                                        selected={values.birthday ? values.birthday : null}
                                                        maxDate={new Date(Date.now() - 10 * 31536000000)}
                                                        onChange={(date) => {
                                                            setValues({ ...values, birthday: date ? date : '' });
                                                        }}
                                                        onBlur={() => setTouched({ ...touched, birthday: true })}
                                                        dateFormat="dd/MM/yyyy"
                                                        placeholderText="-- Chọn --"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className={`form-group ${errors.homeTown && touched.homeTown ? 'error' : ''}`}>
                                                    <label>Quê quán:</label><span className="error-message">{errors.homeTown}</span>
                                                    <Field type="text" name="homeTown" list="home-town" />
                                                    <datalist id="home-town">
                                                        {citysArr.map((v, k) => <option key={k} value={v.value}>{v.value}</option>)}
                                                    </datalist>
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className={`form-group required ${errors.city && touched.city ? 'error' : ''}`}>
                                                    <label>Thành phố:</label><span className="error-message">{errors.city}</span>
                                                    <Select
                                                        defaultValue={{ label: values.city, value: values.city }}
                                                        placeholder="-- Chọn --"
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
                                            <div className="col-sm-4">
                                                <div className={`form-group required ${errors.district && touched.district ? 'error' : ''}`}>
                                                    <label>Quận/huyện:</label><span className="error-message">{errors.district}</span>
                                                    <Select
                                                        placeholder={`${values.city ? '-- Chọn --' : 'Chọn thành phố trước!'}`}
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
                                            <div className="col-sm-4">
                                                <div className={`form-group required ${errors.address && touched.address ? 'error' : ''}`}>
                                                    <label>Số - Tên đường:</label><span className="error-message">{errors.address}</span>
                                                    <Field type="text" name="address" />
                                                </div>
                                            </div>

                                            <div className="col-sm-12">
                                                {isSubmitting ? <button type="submit" className="btn blue">
                                                    <div className="loading-icon" />
                                                </button> : null}

                                                {!isSubmitting ? <Fragment>
                                                    <button disabled={!isValid || !dirty} type="submit" className="btn blue">
                                                        Cập nhật
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
        employee: state.employee
    };
}
export default connect(mapStateToProps)(ScreenDashboardEmployeeDetailUpdate);