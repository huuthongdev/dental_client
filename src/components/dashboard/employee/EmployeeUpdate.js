import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Svg } from '../../../refs';
import isEqual from "react-fast-compare";

class EmployeeUpdate extends Component {
    state = {
        enableUpdate: false,
        same: true
    }

    resetForm() { document.getElementById('update-employee-form').reset(); }

    shouldEnableUpdate() {
        let { name, email, phone, city, district, address, day, month, year } = this.refs;
        name = name.value;
        email = email.value;
        phone = phone.value;
        city = city.value;
        district = district.value;
        address = address.value;
        const birthday = new Date(+year.value, +month.value - 1, +day.value).getTime();
        const refInput = { name, email, phone, city, district, address, birthday };
        const item = this.props.employee.filter(v => v._id === this.props.item._id)[0];
        const current = { name: item.name, email: item.email, phone: item.phone, city: item.city, district: item.district, address: item.address, birthday: item.birthday };
        const same = isEqual(refInput, current);
        this.setState({ same });
    }

    async handleSubmit(e) {
        e.preventDefault();
        this.setState({ loading: true });
        // const { dispatch, item } = this.props;
        // let { name, email, phone, city, district, address, day, month, year } = this.refs;
        // name = name.value;
        // email = email.value;
        // phone = phone.value;
        // city = city.value;
        // district = district.value;
        // address = address.value;
        // const birthday = new Date(+year.value, +month.value - 1, +day.value).getTime();
        // dispatch(updateBranch(item._id, { name, email, phone, city, district, address }))
        //     .then(() => this.setState({ loading: false, enableUpdate: false }));
    }

    render() {
        const item = this.props.employee.filter(v => v._id === this.props.item._id)[0];

        // Birthday related
        const birthday = +item.birthday ? +item.birthday : undefined;
        const dayOfBirth = new Date(birthday).getDate();
        const monthOfBirth = new Date(birthday).getMonth() + 1;
        const yearOfBirth = new Date(birthday).getFullYear();


        return (
            <Fragment>
                <div className="col-sm-12">
                    <div className="cpn-form">
                        <form id="update-employee-form" style={{ marginTop: '0px' }} onChange={() => this.shouldEnableUpdate()}>
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Họ & Tên:</label>
                                            <input ref="name" defaultValue={item.name} type="text" />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Số điện thoại:</label>
                                            <input ref="phone" defaultValue={item.phone} type="text" />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Email:</label>
                                            <input ref="email" defaultValue={item.email} type="text" />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Thành phố:</label>
                                            <input ref="city" defaultValue={item.city} type="text" list="city" />
                                            <datalist id="city">
                                                <option value="HCM">
                                                </option><option value="Binh Thuan">
                                                </option><option value="Can Tho">
                                                </option>
                                            </datalist>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Quận/huyện:</label>
                                            <input ref="district" defaultValue={item.district} type="text" />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Số - Tên đường:</label>
                                            <input ref="address" defaultValue={item.address} type="text" />
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label>Ngày sinh:</label>
                                            <input ref="day" defaultValue={birthday ? dayOfBirth : null} type="number" />
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label>Tháng sinh:</label>
                                            <input ref="month" defaultValue={birthday ? monthOfBirth : null} type="number" />
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label>Năm sinh:</label>
                                            <input ref="year" defaultValue={birthday ? yearOfBirth : null} type="number" />
                                        </div>
                                    </div>

                                    <div className="col-sm-12">
                                        <button disabled={this.state.same} type="submit" className="btn blue">
                                            {this.state.loading ? <div className="loading-icon"></div> : null}
                                            {!this.state.loading ? <Fragment><Svg name="EDIT" /> Lưu thay đổi</Fragment> : null}
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </form>
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
export default connect(mapStateToProps, null)(EmployeeUpdate);