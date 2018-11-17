import React, { Component, Fragment } from 'react';
import { Svg, updateBranch } from '../../../refs';
import isEqual from 'react-fast-compare';
import { connect } from 'react-redux';

class BranchUpdate extends Component {
    state = {
        enableUpdate: false,
        same: true
    }

    resetForm() { document.getElementById('update-branch-form').reset(); }

    shouldEnableUpdate() {
        let { name, email, phone, city, district, address } = this.refs;
        name = name.value;
        email = email.value;
        phone = phone.value;
        city = city.value;
        district = district.value;
        address = address.value;
        const refInput = { name, email, phone, city, district, address };
        const { item } = this.props;
        const current = { name: item.name, email: item.email, phone: item.phone, city: item.city, district: item.district, address: item.address };
        const same = isEqual(refInput, current);
        this.setState({ same });
    }

    async handleSubmit(e) {
        e.preventDefault();
        this.setState({ loading: true });
        const { dispatch, item } = this.props;
        let { name, email, phone, city, district, address } = this.refs;
        name = name.value;
        email = email.value;
        phone = phone.value;
        city = city.value;
        district = district.value;
        address = address.value;
        dispatch(updateBranch(item._id, { name, email, phone, city, district, address }))
            .then(() => { this.setState({ loading: false, same: true }); this.resetForm() });
    }

    render() {
        const item = this.props.branch.filter(v => v._id === this.props.item._id)[0];

        return (
            <Fragment>
                <div className="col-sm-12">
                    <div className="cpn-form">
                        <form id="update-branch-form" onSubmit={(e) => this.handleSubmit(e)} onChange={() => this.shouldEnableUpdate()} style={{ marginTop: '0px' }}>
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Tên chi nhánh:</label>
                                            <input ref="name" defaultValue={item.name} type="text" />
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
                                            <input ref="district" defaultValue={item.district} type="text" list="district" />
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
                                            <input ref="address" defaultValue={item.address} type="text" />
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
                                            <label>Điện thoại chính:</label>
                                            <input ref="phone" defaultValue={item.phone} type="text" />
                                        </div>
                                    </div>

                                    {this.state.same ? null : <Fragment>
                                        <div className="col-sm-12">
                                            <button disabled={this.state.same} type="submit" className="btn blue">
                                                {this.state.loading ? <div className="loading-icon"></div> : null}
                                                {!this.state.loading ? <Fragment><Svg name="EDIT" /> Lưu thay đổi</Fragment> : null}
                                            </button>
                                        </div>
                                    </Fragment>}

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
        branch: state.branch
    };
}
export default connect(mapStateToProps, null)(BranchUpdate);