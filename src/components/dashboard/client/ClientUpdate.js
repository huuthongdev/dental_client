import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import { withFormik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import { RequestService, createAlert, VietNamPlaces, medicalHistoryData, SubmitButtonsGroup, updateClient, converErrorMessage } from '../../../refs';

// Validate functions
async function validateEmail(email) {
    let error;
    // await RequestService.post('/client/validate-email', { email })
    // .catch(() => error = 'Email đã tồn tại');
    return error;
}

async function validatePhone(phone) {
    let error;
    // await RequestService.post('/client/validate-phone', { phone })
    // .catch(() => error = 'Số điện thoại đã tồn tại');
    return error;
}

class ClientUpdateForm extends Component {
    state = {
        enableUpdate: false,
        same: true,
        districtsAvailable: []
    }

    componentDidMount() {
        this.availabelDistricts();
    }

    availabelDistricts = () => {
        const citySelect = this.props.values.city;
        if (!citySelect) return this.setState({ districtsAvailable: [] });
        const districts = Object.values(VietNamPlaces.filter(v => v.name === citySelect)[0].districts);
        return this.setState({ districtsAvailable: districts });
    }

    render() {
        const { goBack, districtsAvailable } = this.state;
        const { handleChange, errors, touched, values, isValid, isSubmitting, dirty } = this.props;

        if (goBack) return <Redirect to="/client" />;
        return (
            <Fragment>
                <div className="col-sm-12">
                    <div className="cpn-form">
                        <Form id="update-branch-form">
                            <div className="container-fluid">
                                <div className="row">
                                    {/* Name */}
                                    <div className="col-sm-6">
                                        <div className={`form-group ${touched.name && errors.name ? 'error' : null}`}>
                                            <label>Họ & tên:</label>
                                            <Field
                                                name="name"
                                                render={({ field }) => (
                                                    <input {...field} name="name" onChange={handleChange} type="text" />
                                                )}
                                            />
                                            <div className="error-message">*{errors.name}</div>
                                        </div>
                                    </div>

                                    {/* Gender */}
                                    <div className="col-sm-6">
                                        <div className={`form-group ${touched.gender && errors.gender ? 'error' : null}`}>
                                            <label>Giới tính:</label>
                                            <div className="select">
                                                <Field
                                                    name="gender"
                                                    render={({ field }) => (
                                                        <select {...field} name="gender" onChange={handleChange}>
                                                            <option value="">-- Chọn --</option>
                                                            <option value="MALE">Nam</option>
                                                            <option value="FEMALE">Nữ</option>
                                                            <option value="OTHER">Khác</option>
                                                        </select>
                                                    )}
                                                />
                                            </div>
                                            <div className="error-message">*{errors.gender}</div>
                                        </div>
                                    </div>

                                    {/*  Email */}
                                    <div className="col-sm-6">
                                        <div className={`form-group ${touched.email && errors.email ? 'error' : null}`}>
                                            <label>Email:</label>
                                            <Field
                                                name="email"
                                                validate={validateEmail}
                                                render={({ field }) => (
                                                    <input {...field} name="email" type="text" onChange={handleChange} />
                                                )}
                                            />
                                            <div className="error-message">*{errors.email}</div>
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div className="col-sm-6">
                                        <div className={`form-group ${touched.phone && errors.phone ? 'error' : null}`}>
                                            <label>Số điện thoại:</label>
                                            <Field
                                                name="phone"
                                                validate={validatePhone}
                                                render={({ field }) => (
                                                    <input {...field} name="phone" type="text" onChange={handleChange} />
                                                )}
                                            />
                                            <div className="error-message">*{errors.phone}</div>
                                        </div>
                                    </div>

                                    {/* City */}
                                    <div className="col-sm-6">
                                        <div className={`form-group ${touched.city && errors.city ? 'error' : null}`}>
                                            <label>Tỉnh/Thành phố:</label>
                                            <div className="select">
                                                <Field
                                                    name="city"
                                                    render={({ field }) => (
                                                        <select {...field} name="city" onChange={handleChange} onBlur={this.availabelDistricts}>
                                                            <option value="">-- Chọn --</option>
                                                            {VietNamPlaces.map((v, i) => (
                                                                <option value={v.name} key={i}>{v.name}</option>
                                                            ))}
                                                        </select>
                                                    )}
                                                />
                                            </div>
                                            <div className="error-message">*{errors.city}</div>
                                        </div>
                                    </div>

                                    {/* District */}
                                    <div className="col-sm-6">
                                        <div className={`form-group ${touched.district && errors.district ? 'error' : null}`}>
                                            <label>Quận huyện:</label>
                                            <div className="select">
                                                <Field
                                                    name="district"
                                                    render={({ field }) => (
                                                        <select {...field} name="district" onChange={handleChange}>
                                                            <option value="">-- Chọn --</option>
                                                            {districtsAvailable.map((v, i) => (
                                                                <option value={v} key={i}>{v}</option>
                                                            ))}
                                                        </select>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Address */}
                                    <div className="col-sm-6">
                                        <div className={`form-group ${touched.address && errors.address ? 'error' : null}`}>
                                            <label>Số nhà & Tên đường:</label>
                                            <Field
                                                name="address"
                                                render={({ field }) => (
                                                    <input {...field} name="address" type="text" onChange={handleChange} />
                                                )}
                                            />
                                        </div>
                                    </div>

                                    {/* HomeTown */}
                                    <div className="col-sm-6">
                                        <div className={`form-group ${touched.homeTown && errors.homeTown ? 'error' : null}`}>
                                            <label>Quê quán:</label>
                                            <div className="select">
                                                <Field
                                                    name="homeTown"
                                                    render={({ field }) => (
                                                        <select {...field} name="homeTown" onChange={handleChange}>
                                                            <option value="">-- Chọn --</option>
                                                            {VietNamPlaces.map((v, i) => (
                                                                <option value={v.name} key={i}>{v.name}</option>
                                                            ))}
                                                        </select>
                                                    )}
                                                />
                                            </div>
                                            <div className="error-message">*{errors.homeTown}</div>
                                        </div>
                                    </div>

                                    {/* Day of Birth */}
                                    <div className="col-sm-4">
                                        <div className={`form-group ${touched.day && errors.day ? 'error' : null}`}>
                                            <label>Ngày sinh:</label>
                                            <Field
                                                name="day"
                                                render={({ field }) => (
                                                    <input {...field} name="day" type="number" onChange={handleChange} />
                                                )}
                                            />
                                            <div className="error-message">*{errors.day}</div>
                                        </div>
                                    </div>

                                    {/* Month of Birth */}
                                    <div className="col-sm-4">
                                        <div className={`form-group ${touched.month && errors.month ? 'error' : null}`}>
                                            <label>Tháng sinh:</label>
                                            <Field
                                                name="month"
                                                render={({ field }) => (
                                                    <input {...field} name="month" type="number" onChange={handleChange} />
                                                )}
                                            />
                                            <div className="error-message">*{errors.month}</div>
                                        </div>
                                    </div>

                                    {/* Year of Birthday */}
                                    <div className="col-sm-4">
                                        <div className={`form-group ${touched.year && errors.year ? 'error' : null}`}>
                                            <label>Năm sinh:</label>
                                            <Field
                                                name="year"
                                                render={({ field }) => (
                                                    <input {...field} name="year" type="number" onChange={handleChange} />
                                                )}
                                            />
                                            <div className="error-message">*{errors.year}</div>
                                        </div>
                                    </div>

                                    {/* Medical History */}
                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <label>Tiểu sử bệnh:</label>

                                            <FieldArray
                                                name='medicalHistory'
                                                render={arrmedicalHistory => (
                                                    <div id="checkbox-medical-history">
                                                        {medicalHistoryData.map((v, i) => (
                                                            <label key={i} className="checkbox-wraper">
                                                                {v}
                                                                <input defaultChecked={values.medicalHistory.includes(v)} onChange={e => {
                                                                    if (e.target.checked) return arrmedicalHistory.push(v)
                                                                    const index = values.medicalHistory.findIndex(item => item === v);
                                                                    return arrmedicalHistory.remove(index);
                                                                }} type="checkbox" />
                                                                <span className="checkmark" />
                                                            </label>
                                                        ))}
                                                    </div>
                                                )}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-sm-6">
                                        <SubmitButtonsGroup disabled={!dirty || !isValid} loading={isSubmitting} />
                                    </div>

                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </Fragment>
        );
    }
}

const converField = (filed, valueIfYes = filed, valueIfNo = '') => {
    return filed ? valueIfYes : valueIfNo;
}

const ClientUpdate = withFormik({
    // Initial data
    mapPropsToValues(props) {
        const item = props.client.filter(v => v._id === props.item._id)[0];
        return {
            _id: converField(item._id),
            name: converField(item.name),
            gender: converField(item.gender),
            email: converField(item.email),
            phone: converField(item.phone),
            city: converField(item.city),
            district: converField(item.district),
            address: converField(item.address),
            homeTown: converField(item.homeTown),
            day: converField(item.birthday, new Date(item.birthday).getDate()),
            month: converField(item.birthday, new Date(item.birthday).getMonth() + 1),
            year: converField(item.birthday, new Date(item.birthday).getFullYear()),
            medicalHistory: converField(item.medicalHistory, []),
            success: false,
            dispatch: props.dispatch
        }
    },
    // Validate
    validationSchema: Yup.object().shape({
        name: Yup.string().required('Tên khách hàng không được để trống'),
        gender: Yup.string().required('Hãy chọn giới tính'),
        email: Yup.string().email('Định dạng email không đúng'),
        phone: Yup.string().required('Số điện thoại khách hàng không được để trống').min(10, 'Số điện thoại ít nhất có 10 chữ số'),
        day: Yup.number().min(0, 'Ngày sinh Không hợp lệ').max(31, 'Ngày sinh không hợp lệ'),
        month: Yup.number().min(1, 'Tháng sinh Không hợp lệ').max(12, 'Tháng sinh không hợp lệ'),
        year: Yup.number().min(1970, 'Năm sinh Không hợp lệ').max(new Date().getFullYear(), 'Năm sinh không hợp lệ'),
    }),
    // Handle Submit
    handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
        const { name, gender, email, phone, city, district, address, medicalHistory, day, month, year, homeTown } = values;
        let birthday = '';
        if (day && month && year) birthday = new Date(+year, +month - 1, +day).getTime();
        const dataSend = { name, gender, email, phone, city, district, address, medicalHistory, birthday, homeTown };
        RequestService.put('/client/' + values._id, dataSend)
            .then(result => {
                values.dispatch(updateClient(result));
                values.dispatch(createAlert('SUCCESS', `Cập nhật thành công khách hàng ${result.name}`));
                values.success = true;
                setSubmitting(false);
                resetForm();
            })
            .catch(error => {
                values.dispatch(createAlert('ERROR', converErrorMessage(error.message)));
                setSubmitting(false);
                resetForm();
            })
    }
})(ClientUpdateForm)

const mapStateToProps = (state) => {
    return {
        client: state.client
    };
}
export default connect(mapStateToProps, null)(ClientUpdate);