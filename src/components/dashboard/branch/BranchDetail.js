import React, { Component, Fragment } from 'react';
import { FadeAnimate, Svg, updateBranch } from '../../../refs';
import isEqual from 'react-fast-compare';
import { connect } from 'react-redux';

class BranchDetail extends Component {
    state = {
        enableUpdate: false,
        loading: false
    }

    shouldEnableUpdate() {
        let { name, email, phone, city, district, address } = this.refs;
        const refInput = { name, email, phone, city, district, address };
        const { item } = this.props;
        const current = { name: item.name, email: item.email, phone: item.phone, city: item.city, district: item.district, address: item.address };
        if (!isEqual(refInput, current)) this.setState({ enableUpdate: true });
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
        .then(() => this.setState({ loading: false, enableUpdate: false }));
    }

    render() {
        const { close, onCreateForm, item } = this.props;
        return (
            <FadeAnimate>
                {/* START COMPONENT TITLE */}
                <div className="container-fluid cpn-head">
                    <div className="row">
                        <div className="col-sm-4">
                            <div className="cpn-form">
                                <div className="container-fluid">
                                    <div className="row align-items-center">
                                        <div className="col-sm-6">
                                            <div className="cpn-form-title">
                                                <Svg name="BRANCH" />
                                                Chi tiết chi nhánh
                                         </div>
                                        </div>
                                        <div className="col-sm-6 text-right">
                                            <button className="cpn-form-close">
                                                <Svg name="CLOSE_FORM" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <form onSubmit={(e) => this.handleSubmit(e)} onChange={() => this.shouldEnableUpdate()}>
                                    <div className="container-fluid">
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <div className="form-group">
                                                    <label>Tên chi nhánh:</label>
                                                    <input ref="name" defaultValue={item.name} type="text" />
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
                                                    <input ref="district" defaultValue={item.district} type="text" list="district" />
                                                    <datalist id="district">
                                                        <option value="HCM">
                                                        </option><option value="Binh Thuan">
                                                        </option><option value="Can Tho">
                                                        </option></datalist>
                                                </div>
                                            </div>
                                            <div className="col-sm-12">
                                                <div className="form-group">
                                                    <label>Số - Tên đường:</label>
                                                    <input ref="address" defaultValue={item.address} type="text" />
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
                                                    <label>Điện thoại chính:</label>
                                                    <input ref="phone" defaultValue={item.phone} type="text" />
                                                </div>
                                            </div>
                                            <div className="col-sm-12">
                                                <button disabled={!this.state.enableUpdate} type="submit" className="btn blue">
                                                    {this.state.loading ? <div className="loading-icon"></div> : null}
                                                    {!this.state.loading ? <Fragment><Svg name="EDIT" /> Lưu thay đổi</Fragment> : null}
                                                </button>

                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col">
                            <div className="cpn-tools-list">
                                <button onClick={() => onCreateForm()} className="btn blue">
                                    <Svg name="CREATE" />
                                    Tạo chi nhánh
                            </button>
                                <button onClick={() => close()} className="btn blue">
                                    <Svg name="BACK" />
                                    Trở lại
                            </button>
                            </div>
                            {/* START SUBMENU */}
                            <ul className="cpn-sub-menu">
                                <li className="active">
                                    Chi nhánh (18)
                            </li>
                                <li>
                                    Nhân sự
                            </li>
                            </ul>
                            {/* END SUBMENU */}
                            {/* START TABLE */}
                            <table>
                                <thead>
                                    <tr>
                                        <th className="sid">ID</th>
                                        <th>Tên chi nhánh</th>
                                        <th>Số - Tên đường</th>
                                        <th>Quận/Xã</th>
                                        <th>Thành phố</th>
                                        <th>Điện thoại</th>
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="sid">
                                            <div className="left-row-side" />
                                            10001
                                        </td>
                                        <td className="link"> CN Gò Vấp </td>
                                        <td> 277 - Nguyễn Thái Sơn </td>
                                        <td>Gò Vấp</td>
                                        <td>Hồ Chí Minh</td>
                                        <td>0908 557 899</td>
                                        <td className="list-tools">
                                            <button className="row-toggle-list-tools">
                                                <svg width="10px" height="7px" viewBox="0 0 10 7" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                                    <g id="Dental-Application" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                                                        <g id="Mange---Branch" transform="translate(-1227.000000, -307.000000)" fill="#14AD0D">
                                                            <g id="Table-Body" transform="translate(90.000000, 280.000000)">
                                                                <g id="Branch-Row-Detail">
                                                                    <g id="Icon-Remove-Copy" transform="translate(1127.000000, 15.000000)">
                                                                        <path d="M10.124819,13.6798328 C9.95839367,13.5134075 9.95839367,13.2436078 10.124819,13.0771825 L11.0779157,12.124819 C11.2436078,11.9583937 11.5134075,11.9583937 11.6798328,12.124819 L14.6989498,15.1439359 C14.8653751,15.3096281 15.1351748,15.3096281 15.300867,15.1439359 L18.3199839,12.124819 C18.4864092,11.9583937 18.7562089,11.9583937 18.9226342,12.124819 L19.8757309,13.0771825 C20.041423,13.2436078 20.041423,13.5134075 19.8757309,13.6798328 L15.300867,18.2539636 C15.1351748,18.4203889 14.8653751,18.4203889 14.6989498,18.2539636 L10.124819,13.6798328 Z" id="Icon-Dropdown" />
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </svg>
                                            </button>
                                            <button className="row-btn-remove">
                                                <svg width="12px" height="12px" viewBox="0 0 12 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                                    <g id="Dental-Application" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                                                        <g id="Mange---Clients" transform="translate(-1275.000000, -322.000000)" fill="#FF3636" fillRule="nonzero">
                                                            <g id="Row" transform="translate(89.000000, 293.000000)">
                                                                <g id="Group-13" transform="translate(39.000000, 20.000000)">
                                                                    <g id="Icon-Remove" transform="translate(1138.000000, 0.000000)">
                                                                        <g id="Group">
                                                                            <path d="M19.912722,10.0872951 C19.5283447,9.70289492 18.9056729,9.70289492 18.5212956,10.0872951 L15.0003001,13.608275 L11.4793047,10.0872951 C11.0949273,9.70289492 10.4721055,9.70289492 10.0877282,10.0872951 C9.70335082,10.4714702 9.70335082,11.0947043 10.0877282,11.4788794 L13.6082734,14.9998593 L10.087278,18.5209142 C9.70290064,18.9050143 9.70290064,19.5280233 10.087278,19.9125736 C10.2794291,20.1048112 10.531304,20.200855 10.7830287,20.200855 C11.0347535,20.200855 11.2865533,20.1048112 11.4786294,19.9125736 L15.0003001,16.3912185 L18.5212956,19.9127236 C18.7135218,20.1049612 18.9651715,20.201005 19.2168963,20.201005 C19.468546,20.201005 19.7204208,20.1050363 19.912572,19.9127236 C20.2969493,19.5286235 20.2969493,18.9053144 19.912572,18.5212144 L16.3917266,14.9998593 L19.912722,11.4788794 C20.2970994,11.0947043 20.2970994,10.4716953 19.912722,10.0872951 Z" id="Shape" />
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </svg>
                                            </button>
                                            <div className="right-row-side" />
                                        </td>
                                    </tr>
                                    <tr className="empty">
                                    </tr>

                                </tbody>
                            </table>
                            {/* END TABLE */}
                            {/* START PAGING */}
                            <div className="paging">
                                <ul>
                                    <li className="active">1</li>
                                    <li>2</li>
                                    <li>3</li>
                                    <li>4</li>
                                    <li>5</li>
                                </ul>
                            </div>
                            {/* END PAGING */}
                        </div>
                    </div>
                </div>
                {/* END COMPONENT TITLE */}
            </FadeAnimate>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        branch: state.branch
    };
}
export default connect(mapStateToProps, null)(BranchDetail);