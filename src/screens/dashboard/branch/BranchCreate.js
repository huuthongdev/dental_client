import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as Yup from 'yup';
import { Formik, Form, Field } from "formik";
import Select from 'react-select'
import { Svg, createBranch, CpnWraper, TitleApp, VietNamPlaces, BranchService } from "../../../refs";

class BranchCreate extends Component {
	state = {
		loading: false,
		goBack: false,
		redirectToDetail: null
	};

	handleSubmit(e) {
		e.preventDefault();
		this.setState({ loading: true });
		const { dispatch } = this.props;
		let { name, email, phone, city, district, address } = this.refs;
		name = name.value;
		email = email.value;
		phone = phone.value;
		city = city.value;
		district = district.value;
		address = address.value;
		dispatch(
			createBranch(
				{ name, email, phone, city, district, address },
				() => this.setState({ loading: false }),
				_id => this.setState({ redirectToDetail: _id })
			)
		);
	}

	render() {
		const { goBack, redirectToDetail } = this.state;
		if (goBack) return <Redirect to="/branch" />;
		if (redirectToDetail)
			return <Redirect to={`/branch/${redirectToDetail}`} />;
		return (
			<CpnWraper>
				<TitleApp sub="Tạo chi nhánh" />
				<div className="cpn-form">
					<div className="container-fluid mb-1">
						<div className="row align-items-center">
							<div className="col-sm-8">
								<div className="cpn-form-title">
									<Svg name="BRANCH" />
									Thêm mới chi nhánh
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
							email: '',
							phone: '',
							city: '',
							district: '',
							address: ''
						}}
						validationSchema={Yup.object().shape({
							name: Yup.string().required('Không được để trống'),
							email: Yup.string().required('Không được để trống').email('Không đúng định dạng email'),
							phone: Yup.string().required('Không được để trống').min(10, 'Số điện thoại không hợp lệ.').max(10, 'Số điện thoại không hợp lệ.'),
							city: Yup.string().required('Không được để trống'),
							district: Yup.string().required('Không được để trống'),
							address: Yup.string().required('Không được để trống')
						})}
						onSubmit={(values, { setSubmitting }) => {
							BranchService.create(values)
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
												<label>Điện thoại chính:</label><span className="error-message">{errors.phone}</span>
												<Field type="text" name="phone" />
											</div>
										</div>
										<div className="col-sm-4">
											<div className={`form-group required ${errors.city && touched.city ? 'error' : ''}`}>
												<label>Thành phố:</label><span className="error-message">{errors.city}</span>
												<Select
													options={citysArr}
													className="select"
													classNamePrefix="react-select"
													onChange={value => setValues({ ...values, city: value.label, district: '' })}
													isSearchable
													onBlur={() => setTouched({ ...touched, city: true })}
												/>
											</div>
										</div>
										<div className="col-sm-4">
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
						}} />
				</div>
			</CpnWraper>
		);
	}
}

const mapStateToProps = state => {
	return {
		branch: state.branch
	};
};
export default connect(
	mapStateToProps,
	null
)(BranchCreate);
