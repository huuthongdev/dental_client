import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import * as Yup from 'yup';
import { Formik, Form, Field } from "formik";
import DatePicker from "react-datepicker";
import Select from 'react-select'
import { CpnSvg, TitleApp, Roles, GetRoleName, ScreenDashboardWraper, VietNamPlaces, EmployeeService, BranchService, CheckRoleService, Role, UserService, CpnFetchingData, RequestService, AlertService } from "../../../refs";

class ScreenDashboardEmployeeCreate extends Component {
	state = {
		redirectToDetail: null,
		// NEW || OLD
		tabActive: 'NEW',
		goBack: false,
		fetching: true,
		employees: []
	};

	componentDidMount() {
		RequestService.get('/user/fetch')
			.then(result => this.setState({ employees: result, fetching: false }))
			.catch(error => {
				this.setState({ fetching: false });
				AlertService.error(error.message);
			});
	}

	render() {
		const { redirectToDetail, tabActive, goBack, fetching, employees } = this.state;
		const { branch } = this.props;

		if (goBack) return <Redirect to="/employee" />
		if (redirectToDetail) return <Redirect to={`/employee/${redirectToDetail}`} />;

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

		if (fetching) return <CpnFetchingData dashboardWraper />
		console.log(employees);
		return (
			<ScreenDashboardWraper>
				<TitleApp sub="Tạo nhân sự" />
				<div className="container-fluid">
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
									<Link to="/employee">
										<button className="cpn-form-close">
											<CpnSvg name="CLOSE_FORM" />
										</button>
									</Link>
								</div>
							</div>
						</div>

						<div className="container-fluid">
							<div className="row">
								<div className="col-sm-12">
									<ul className="cpn-sub-menu">
										<li onClick={() => this.setState({ tabActive: 'NEW' })} className={tabActive === "NEW" ? "active" : null} >
											Nhân sự mới
                				    </li>
										<li onClick={() => this.setState({ tabActive: 'OLD' })} className={tabActive === "OLD" ? "active" : null} >
											Điều phối
                				    </li>
									</ul>
								</div>
							</div>
						</div>

						{tabActive === 'NEW'
							? <Formik
								initialValues={{
									name: '',
									email: '',
									password: '',
									confirmPassword: '',
									birthday: '',
									city: '',
									district: '',
									address: '',
									branchWorkId: !CheckRoleService.check(Role.ADMIN) ? BranchService.getCurrentBranch()._id : '',
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
										.then(result => {
											if (result) return this.setState({ redirectToDetail: result._id });
											return setSubmitting(false);
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
														{CheckRoleService.check(Role.ADMIN) ? <Select
															placeholder="-- Chọn --"
															options={branch.map(v => v = { label: v.name, value: v._id })}
															className="select"
															classNamePrefix="react-select"
															onChange={selected => setValues({ ...values, branchWorkId: selected.value })}
															isSearchable
															onBlur={() => setTouched({ ...touched, branchWorkId: true })}
														/> : <input readOnly type="text" defaultValue={BranchService.getCurrentBranch().name} />}

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
							: null}


						{tabActive === 'OLD' ? <Formik
							initialValues={{
								roles: '',
								userId: '',
								branchId: localStorage.getItem("BRANCH")
							}}
							validationSchema={Yup.object().shape({
								roles: Yup.array(),
								userId: Yup.string().required('Không được để trống')
							})}
							onSubmit={(values, { setSubmitting }) => {
								const { roles, userId, branchId } = values;
								UserService.setRoleInBranch(userId, branchId, roles)
									.then((result) => {
										if (result) return this.setState({ goBack: true });
										return setSubmitting(false);
									});
							}}
							render={props => {
								const { isSubmitting, isValid, errors, touched, setValues, values, setTouched } = props;
								const { employee } = this.props;
								const employeeArr = employees.filter(v => !employee.find(k => k._id === v._id)).map(v => v = { label: `${v.name}`, value: v._id });
								const branchEmployees = branch && branch.detail && branch.detail.employees ? branch.detail.employees : [];

								return <Form>
									<div className="container-fluid">
										<div className="row">
											<div className="col-sm-12">
												<div className={`form-group required ${errors.userId && touched.userId ? 'error' : ''}`}>
													<label>Nhân sự</label><span className="error-message">{errors.userId}</span>
													<Select
														placeholder="-- Chọn --"
														options={employeeArr}
														className="select"
														classNamePrefix="react-select"
														onChange={selected => {
															const checkEmployee = branchEmployees.find(v => v.user._id === selected.value);
															const roles = checkEmployee ? checkEmployee.roles : [];
															setValues({ ...values, userId: selected.value, roles });
														}}
														isSearchable
														onBlur={() => setTouched({ ...touched, userId: true })}
													/>
												</div>
											</div>
											<div className="col-sm-12">
												<div className={`form-group ${errors.ss && touched.roles ? 'error' : ''}`}>
													<label>Vai trò tương ứng:</label><span className="error-message">{errors.roles}</span>
													<Select
														value={values.roles ? values.roles.map(v => v = { label: GetRoleName(v), value: v }) : null}
														placeholder="-- Chọn --"
														options={Roles.map(v => v = { label: GetRoleName(v), value: v })}
														className="select isMulti"
														classNamePrefix="react-select"
														onChange={selected => {
															setValues({ ...values, roles: selected.map(v => v.value) });
														}}
														onBlur={() => setTouched({ ...touched, roles: true })}
														isMulti
														isDisabled={!values.userId}
													/>
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
												</Fragment> : null}
											</div>
										</div>
									</div>
								</Form>
							}}
						/> : null}
					</div>
				</div>
			</ScreenDashboardWraper>
		);
	}
}

const mapStateToProps = state => {
	return {
		branch: state.branch,
		employee: state.employee
	};
};
export default connect(mapStateToProps)(ScreenDashboardEmployeeCreate);
