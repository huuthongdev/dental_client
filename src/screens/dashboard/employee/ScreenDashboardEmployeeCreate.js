import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as Yup from 'yup';
import { Formik, Form, Field } from "formik";
import DatePicker from "react-datepicker";
import Select from 'react-select'
import { CpnSvg, TitleApp, Roles, GetRoleName, ScreenDashboardWraper, VietNamPlaces, EmployeeService } from "../../../refs";

class ScreenDashboardEmployeeCreate extends Component {
	state = {
		loading: false,
		goBack: false,
		redirectToDetail: null
	};

	render() {
		const { goBack, redirectToDetail } = this.state;
		const { branch } = this.props;

		if (goBack) return <Redirect to="/employee" />;

		if (redirectToDetail)
			return <Redirect to={`/employee/${redirectToDetail}`} />;


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

		return (
			<ScreenDashboardWraper>
				<TitleApp sub="Tạo nhân sự" />
				<div className="cpn-form">
					<div className="container-fluid mb-1">
						<div className="row align-items-center">
							<div className="col-sm-8">
								<div className="cpn-form-title">
									<CpnSvg name="EMPLOYEE" />
									Thêm mới nhân sự
                			</div>
							</div>
							<div className="col-sm-4 text-right">
								<button
									onClick={() =>
										this.setState({ goBack: true })
									}
									className="cpn-form-close"
								>
									<CpnSvg name="CLOSE_FORM" />
								</button>
							</div>
						</div>
					</div>
					<Formik
						initialValues={{
							name: '',
							email: '',
							password: '',
							confirmPassword: '',
							birthday: '',
							city: '',
							district: '',
							address: '',
							branchWorkId: '',
							branchRoles: '',
							phone: '',
							homeTown: ''
						}}
						validationSchema={Yup.object().shape({
							name: Yup.string().required('Không được để trống'),
							email: Yup.string().required('Không được để trống').email('Không đúng định dạng email'),
							password: Yup.string().required('Không được để trống'),
							confirmPassword: Yup.string().equalTo(Yup.ref('password'), 'Không trùng khớp').required('Không được để trống'),
							birthday: Yup.string(),
							city: Yup.string().required('Không được để trống'),
							district: Yup.string().required('Không được để trống'),
							address: Yup.string().required('Không được để trống'),
							branchWorkId: Yup.string().required('Không được để trống'),
							branchRoles: Yup.array().required('Không được để trống'),
							phone: Yup.string().required('Không được để trống').min(10, 'Số điện thoại không hợp lệ.').max(10, 'Số điện thoại không hợp lệ.'),
							homeTown: Yup.string()
						})}
						onSubmit={(values, { setSubmitting }) => {
							EmployeeService.create({ ...values, birthday: new Date(values.birthday).getTime() })
							.then(success => {
								if (success) return this.setState({ goBack: true });
								setSubmitting(false);
							})
						}}
						render={props => {
							const { isSubmitting, isValid, errors, touched, setValues, values, setTouched } = props;

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
										<div className="col-sm-4">
											<div className={`form-group required ${errors.city && touched.city ? 'error' : ''}`}>
												<label>Thành phố:</label><span className="error-message">{errors.city}</span>
												<Select
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

										<div className="col-sm-6">
											<div className={`form-group ${errors.homeTown && touched.homeTown ? 'error' : ''}`}>
												<label>Quê quán:</label><span className="error-message">{errors.homeTown}</span>
												<Field type="text" name="homeTown" list="home-town" />
												<datalist id="home-town">
													{citysArr.map((v, k) => <option key={k} value={v.value}>{v.value}</option>)}
												</datalist>
											</div>
										</div>

										<div className="col-sm-6">
											<div className={`form-group required ${errors.branchWorkId && touched.branchWorkId ? 'error' : ''}`}>
												<label>Đơn vị làm việc:</label><span className="error-message">{errors.branchWorkId}</span>
												<Select
													placeholder="-- Chọn --"
													options={branch.map(v => v = { label: v.name, value: v._id })}
													className="select"
													classNamePrefix="react-select"
													onChange={selected => setValues({ ...values, branchWorkId: selected.value })}
													isSearchable
													onBlur={() => setTouched({ ...touched, branchWorkId: true })}
												/>
											</div>
										</div>

										<div className="col-sm-12">
											<div className={`form-group required ${errors.branchRoles && touched.branchRoles ? 'error' : ''}`}>
												<label>Vai trò tương ứng:</label><span className="error-message">{errors.branchRoles}</span>
												<Select
													placeholder="-- Chọn --"
													options={Roles.map(v => v = { label: GetRoleName(v), value: v })}
													className="select isMulti"
													classNamePrefix="react-select"
													onChange={selected => setValues({ ...values, branchRoles: selected.map(v => v.value) })}
													isSearchable
													onBlur={() => setTouched({ ...touched, branchRoles: true })}
													isMulti
												/>
											</div>
										</div>

										<div className="col-sm-6">
											<div className={`form-group required ${errors.password && touched.password ? 'error' : ''}`}>
												<label>Password:</label><span className="error-message">{errors.password}</span>
												<Field type="password" name="password" />
											</div>
										</div>

										<div className="col-sm-6">
											<div className={`form-group required ${errors.confirmPassword && touched.confirmPassword ? 'error' : ''}`}>
												<label>Xác nhận mật khẩu:</label><span className="error-message">{errors.confirmPassword}</span>
												<Field type="password" name="confirmPassword" />
											</div>
										</div>

										<div className="col-sm-12">
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

const mapStateToProps = state => {
	return {
		branch: state.branch
	};
};
export default connect(mapStateToProps)(ScreenDashboardEmployeeCreate);
