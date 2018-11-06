import React, { Component, Fragment } from 'react';
import { FadeAnimate, Svg, TitleApp, Roles, GetRoleName, createEmployee } from '../../../refs';
import { connect } from 'react-redux';

class EmployeeCreate extends Component {
    state = {
        loading: false,
        checkPassword: false,
        errorMessage: null,
        password: null,
        confirmPassword: null
    }

    showLoadingButton() {
        const { loading } = this.state;
        if (loading) return <button type="submit" className="btn blue"> <div className="loading-icon"></div> </button>
        return <Fragment>
            <button type="submit" className="btn blue"> Xác nhận </button>
            <button onClick={() => this.props.returnMain()} className="btn outline-grey"> Huỷ </button>
        </Fragment>
    }

    onErrorConfirmPassword() {
        const { password, confirmPassword } = this.state;
        if (password !== confirmPassword) return this.setState({
            checkPassword: false,
            errorMessage: 'Lỗi: Xác nhận mật khẩu không trùng khớp!'
        });
    }

    showBranchSelect() {
        const { branch } = this.props;
        return branch.map((v, i) => {
            return <option key={i} value={v._id}>{v.name}</option>
        });
    }

    showRolesSelect() {
        return Roles.map((v, i) => {
            return <option key={i} value={v}>{GetRoleName(v)}</option>
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        let { name, email, phone, password, day, month, year, city, district, address, branchWorkId, branchRole } = this.refs;
        let birthday;
        name = name.value; email = email.value; phone = phone.value; password = password.value; birthday = new Date(year.value, month.value + 1, day.value).getTime();
        city = city.value; district = district.value; address = address.value; branchWorkId = branchWorkId.value; branchRole = branchRole.value;
        const dataSend = { name, email, password, birthday, city, district, address, branchWorkId, branchRole, phone };
        this.setState({ loading: true });
        const { dispatch } = this.props;
        dispatch(createEmployee(dataSend, this.props.returnMain))
        .then(() => {
            this.setState({ loading: false });
        });
    }

    render() {
        const { returnMain } = this.props;
        const { errorMessage } = this.state;

        return (
            <FadeAnimate>
                <TitleApp sub="Tạo nhân sự" />
                <div className="cpn-form">
                    <div className="container-fluid">
                        <div className="row align-items-center">
                            <div className="col-sm-8">
                                <div className="cpn-form-title">
                                    <Svg name="EMPLOYEE" />
                                    Thêm mới nhân sự
                            </div>
                            </div>
                            <div className="col-sm-4 text-right">
                                <button onClick={() => returnMain()} className="cpn-form-close">
                                    <Svg name="CLOSE_FORM" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={(e) => this.handleSubmit(e)}>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <label>Họ & Tên:</label>
                                        <input required ref="name" type="text" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Email:</label>
                                        <input ref="email" type="text" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Điện thoại chính:</label>
                                        <input ref="phone" type="text" />
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="form-group">
                                        <label>Thành phố:</label>
                                        <input ref="city" type="text" list="city" />
                                        <datalist id="city">
                                            <option value="HCM">
                                            </option><option value="Binh Thuan">
                                            </option><option value="Can Tho">
                                            </option></datalist>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="form-group">
                                        <label>Quận/huyện:</label>
                                        <input ref="district" type="text" list="district" />
                                        <datalist id="district">
                                            <option value="HCM">
                                            </option><option value="Binh Thuan">
                                            </option><option value="Can Tho">
                                            </option></datalist>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="form-group">
                                        <label>Số - Tên đường:</label>
                                        <input ref="address" type="text" />
                                    </div>
                                </div>

                                <div className="col-sm-4">
                                    <div className="form-group">
                                        <label>Ngày sinh:</label>
                                        <input ref="day" type="number" />
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="form-group">
                                        <label>Tháng sinh:</label>
                                        <input ref="month" type="number" />
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="form-group">
                                        <label>Năm sinh:</label>
                                        <input ref="year" type="number" />
                                    </div>
                                </div>

                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Đơn vị làm việc:</label>
                                        <div className="select">
                                            <select ref="branchWorkId">
                                                <option value="">-- Chọn --</option>
                                                {this.showBranchSelect()}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Vai trò tương ứng:</label>
                                        <div className="select">
                                            <select ref="branchRole">
                                                <option value="">-- Chọn --</option>
                                                {this.showRolesSelect()}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Mật khẩu:</label>
                                        <input onChange={(e) => this.setState({ password: e.target.value })} ref="password" type="password" />
                                    </div>
                                </div>

                                <div className="col-sm-6">
                                    <div className={`form-group ${errorMessage ? 'error' : ''}`}>
                                        <label>Xác nhận mật khẩu:</label>
                                        <input onKeyDown={() => this.onErrorConfirmPassword()} onChange={(e) => this.setState({ confirmPassword: e.target.value, errorMessage: null })} ref="confirmPassword" type="password" />
                                        {errorMessage ? <div className="error-message">{errorMessage}</div> : null}
                                    </div>
                                </div>

                                <div className="col-sm-6">
                                    {this.showLoadingButton()}
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </FadeAnimate>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        branch: state.branch
    };
}
export default connect(mapStateToProps, null)(EmployeeCreate);