import React, { Component, Fragment } from 'react';
import { Svg, createBranch, CpnWraper, TitleApp } from '../../../refs';
import { connect } from 'react-redux';

class BranchCreate extends Component {
    state = {
        loading: false
    }

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
        dispatch(createBranch({ name, email, phone, city, district, address }, this.props.closeForm));
    }

    showLoadingButton() {
        const { loading } = this.state;
        if (loading) return <button type="submit" className="btn blue"> <div className="loading-icon"></div> </button>
        return <Fragment>
            <button type="submit" className="btn blue"> Xác nhận </button>
            <button onClick={() => this.props.closeForm()} className="btn outline-grey"> Huỷ </button>
        </Fragment>
    }

    render() {
        return (
            <CpnWraper>
                    <TitleApp sub="Tạo chi nhánh" />
                    <div className="cpn-form">
                        <div className="container-fluid">
                            <div className="row align-items-center">
                                <div className="col-sm-8">
                                    <div className="cpn-form-title">
                                        <Svg name="BRANCH" />
                                        Thêm mới chi nhánh
                            </div>
                                </div>
                                <div className="col-sm-4 text-right">
                                    <button onClick={() => this.props.closeForm()} className="cpn-form-close">
                                        <Svg name="CLOSE_FORM" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <form onSubmit={(e) => this.handleSubmit(e)}>
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Tên chi nhánh:</label>
                                            <input required ref="name" type="text" />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
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
                                    <div className="col-sm-6">
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
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Số - Tên đường:</label>
                                            <input ref="address" type="text" />
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
                                    <div className="col-sm-6">
                                        {this.showLoadingButton()}
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
            </CpnWraper>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        branch: state.branch
    };
}
export default connect(mapStateToProps, null)(BranchCreate);