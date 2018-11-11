import React, { Component, Fragment } from 'react';
import { Svg } from '../../../refs';

class EmployeeUpdate extends Component {
    state = {
        enableUpdate: false,
        same: true
    }

    shouldEnableUpdate() {
        // let { name, email, phone, city, district, address } = this.refs;
        // name = name.value;
        // email = email.value;
        // phone = phone.value;
        // city = city.value;
        // district = district.value;
        // address = address.value;
        // const refInput = { name, email, phone, city, district, address };
        // const { item } = this.props;
        // const current = { name: item.name, email: item.email, phone: item.phone, city: item.city, district: item.district, address: item.address };
        // const same = isEqual(refInput, current);
        // this.setState({ same });
    }

    async handleSubmit(e) {
        e.preventDefault();
        // this.setState({ loading: true });
        // const { dispatch, item } = this.props;
        // let { name, email, phone, city, district, address } = this.refs;
        // name = name.value;
        // email = email.value;
        // phone = phone.value;
        // city = city.value;
        // district = district.value;
        // address = address.value;
        // dispatch(updateBranch(item._id, { name, email, phone, city, district, address }))
        //     .then(() => this.setState({ loading: false, enableUpdate: false }));
    }

    render() {
        const { item } = this.props;
        return (
            <Fragment>
                <div className="col-sm-4">
                    <div className="cpn-form">
                        <div className="container-fluid">
                            <div className="row align-items-center">
                                <div className="col-sm-6">
                                    <div className="cpn-form-title">
                                        <Svg name="EMPLOYEE" />
                                        Chi tiết nhân sự
                                         </div>
                                </div>
                                {/* <div className="col-sm-6 text-right">
                                    <button className="cpn-form-close">
                                        <Svg name="CLOSE_FORM" />
                                    </button>
                                </div> */}
                            </div>
                        </div>
                        {/* <form onSubmit={(e) => this.handleSubmit(e)} onChange={() => this.shouldEnableUpdate()}> */}
                        <form>
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <label>Họ & Tên:</label>
                                            <input ref="name" defaultValue={item.name} type="text" />
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <label>Số điện thoại:</label>
                                            <input ref="phone" defaultValue={item.phone} type="text"/>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <label>Email:</label>
                                            <input ref="email" defaultValue={item.email} type="text" />
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
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
                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <label>Quận/huyện:</label>
                                            <input ref="district" defaultValue={item.district} type="text" />
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <label>Số - Tên đường:</label>
                                            <input ref="address" defaultValue={item.address} type="text" />
                                        </div>
                                    </div>
                                    {/* <div className="col-sm-12">
                                        <div className="form-group">
                                            <label>Ngày sinh:</label>
                                            <input ref="day" defaultValue={item.address} type="text" />
                                        </div>
                                    </div> */}
                                    
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

export default EmployeeUpdate;