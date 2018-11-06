import React, { Component, Fragment } from 'react';
import { Svg, RequestService, addBranch, createAlert, FadeAnimate } from '../../../refs';
import { connect } from 'react-redux';

class BranchCreate extends Component {
    state = {
        loading: false
    }

    async handleSubmit(e) {
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
        await RequestService.post('/branch', { name, email, phone, city, district, address })
            .then(result => {
                this.setState({ loading: false });
                dispatch(addBranch(result));
                dispatch(createAlert('SUCCESS', `Tạo thành công chi nhánh ${result.name}`));
                this.props.closeForm();
            })
            .catch(error => {
                dispatch(createAlert('ERROR', error.message));
                this.setState({ loading: false });
            });
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
            <FadeAnimate>
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
            </FadeAnimate>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        branch: state.branch
    };
}
export default connect(mapStateToProps, null)(BranchCreate);