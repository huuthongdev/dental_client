import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import { Form, Field, Formik } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import { VietNamPlaces, medicalHistoryData, SubmitButtonsGroup, ClientService, convertToSave, getLabelGender } from '../../../../refs';

class ScreenClientDetailUpdate extends Component {
    state = {
        goBack: false
    }

    render() {
        const { goBack } = this.state;
        const { detail } = this.props;

        if (goBack) return <Redirect to="/client" />;
        return (
            <Fragment>
                    <div className="cpn-form">
                        <Formik
                            initialValues={{
                                name: convertToSave(detail.name, detail.name, ''),
                                phone: convertToSave(detail.phone, detail.phone, ''),
                                email: convertToSave(detail.email, detail.email, ''),
                                birthday: convertToSave(detail.birthday, detail.birthday, ''),
                                medicalHistory: convertToSave(detail.medicalHistory, detail.medicalHistory, []),
                                city: convertToSave(detail.city, detail.city, ''),
                                district: convertToSave(detail.district, detail.district, ''),
                                address: convertToSave(detail.address, detail.address, ''),
                                homeTown: convertToSave(detail.homeTown, detail.homeTown, ''),
                                gender: convertToSave(detail.gender, detail.gender, '')
                            }}
                            validationSchema={Yup.object().shape({
                                name: Yup.string().required('không được để trống'),
                                phone: Yup.string().required('không được để trống'),
                                email: Yup.string().email('định dạng email không đúng'),
                                birthday: Yup.number(),
                                medicalHistory: Yup.array(),
                                city: Yup.string(),
                                district: Yup.string(),
                                address: Yup.string(),
                                homeTown: Yup.string(),
                                gender: Yup.string().required('không được để trống')
                            })}
                            onSubmit={(values, { setSubmitting, resetForm }) => {
                                ClientService.update(detail._id, values)
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
                                            <div className="col-sm-6">
                                                <div className={`form-group required ${errors.name && touched.name ? 'error' : ''}`}>
                                                    <label>Tên:</label><span className="error-message">{errors.name}</span>
                                                    <Field type="text" name="name" />
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className={`form-group required ${errors.gender && touched.gender ? 'error' : ''}`}>
                                                    <label>Giới tính:</label><span className="error-message">{errors.gender}</span>
                                                    <Select
                                                        defaultValue={{ value: values.gender, label: getLabelGender(values.gender) }}
                                                        placeholder="-- Chọn --"
                                                        options={[
                                                            { label: 'Nam', value: 'MALE' },
                                                            { label: 'Nữ', value: 'FEMALE' },
                                                            { label: 'Khác', value: 'OTHER' }
                                                        ]}
                                                        className="select"
                                                        classNamePrefix="react-select"
                                                        onChange={value => {
                                                            setValues({ ...values, gender: value.value });
                                                        }}
                                                        onBlur={() => setTouched({ ...touched, gender: true })}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className={`form-group required ${errors.phone && touched.phone ? 'error' : ''}`}>
                                                    <label>Điện thoại:</label><span className="error-message">{errors.phone}</span>
                                                    <Field type="text" name="phone" />
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className={`form-group ${errors.email && touched.email ? 'error' : ''}`}>
                                                    <label>Email:</label><span className="error-message">{errors.email}</span>
                                                    <Field type="text" name="email" />
                                                </div>
                                            </div>

                                            <div className="col-sm-6">
                                                <div className={`form-group ${errors.birthday && touched.birthday ? 'error' : ''}`}>
                                                    <label>Ngày sinh:</label><span className="error-message">{errors.birthday}</span>
                                                    <DatePicker
                                                        selected={values.birthday ? new Date(values.birthday) : null}
                                                        maxDate={new Date(Date.now() - 10 * 31536000000)}
                                                        onChange={(date) => {
                                                            setValues({ ...values, birthday: date ? new Date(date).getTime() : '' });
                                                        }}
                                                        onBlur={() => setTouched({ ...touched, birthday: true })}
                                                        dateFormat="dd/MM/yyyy"
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
                                                <div className={`form-group ${errors.city && touched.city ? 'error' : ''}`}>
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
                                                <div className={`form-group ${errors.district && touched.district ? 'error' : ''}`}>
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
                                                <div className={`form-group ${errors.address && touched.address ? 'error' : ''}`}>
                                                    <label>Số - Tên đường:</label><span className="error-message">{errors.address}</span>
                                                    <Field type="text" name="address" />
                                                </div>
                                            </div>

                                            <div className="col-sm-12">
                                                <div className={`form-group ${errors.medicalHistory && touched.medicalHistory ? 'error' : ''}`}>
                                                    <label>Tiểu sử bệnh:</label><span className="error-message">{errors.medicalHistory}</span>
                                                    <Select
                                                        defaultValue={values.medicalHistory ? values.medicalHistory.map(v => v = { label: v, value: v }) : null}
                                                        options={medicalHistoryData.map(v => v = { label: v, value: v })}
                                                        className="select isMulti"
                                                        classNamePrefix="react-select"
                                                        onChange={selected => setValues({ ...values, medicalHistory: selected.map(v => v.value) })}
                                                        isSearchable
                                                        onBlur={() => setTouched({ ...touched, medicalHistory: true })}
                                                        isMulti
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-sm-6">
                                                <SubmitButtonsGroup label="Cập nhật" disabled={!isValid || !dirty} loading={isSubmitting} />
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                            }}
                        />
                    </div>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        client: state.client
    };
}
export default connect(mapStateToProps)(ScreenClientDetailUpdate);