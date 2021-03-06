import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { CpnSvg, GetRoleName, CheckRoleService, Role, UserService } from '../../refs';
import { connect } from 'react-redux';

class ScreenDashboardSidebar extends Component {

    showRolesCurrentBranch() {
        const { roleInBranchs } = this.props.user;
        let currentBranch = localStorage.getItem("BRANCH");
        currentBranch = roleInBranchs.filter(v => v.branch._id === currentBranch)[0];
        if (!currentBranch) return localStorage.removeItem("BRANCH");
        let roles = currentBranch.roles;
        roles = roles.map(v => GetRoleName(v));
        return roles.map((v, i) => <Fragment key={i}>
            <li>{v}</li>
        </Fragment>)
    }

    render() {
        const { name } = this.props.user;
        const rolesCurrentBracnh = UserService.getRolesInCurrentBranch();
        return (
            <Fragment>
                <div className="sidebar" id="sidebar-main">
                    <div className="side-bar-logo">
                        <CpnSvg name="LOGO" />
                    </div>

                    <div className="user-info">
                        <div className="avatar"><CpnSvg name="USER" /></div>
                        <h4>{name}</h4>
                        {rolesCurrentBracnh.map((value, key) => <p key={key}>• {GetRoleName(value)}</p>)}
                    </div>

                    <ul className="sidebar-menu">

                        <NavLink exact to="/">
                            <li>
                                <CpnSvg name="HOME" />
                                <span>Tổng quan</span>
                            </li>
                        </NavLink>
                    </ul>

                    {CheckRoleService.check(Role.DIRECTOR) ?
                        <ul className="sidebar-menu">
                            <label>HỆ THỐNG</label>
                            {CheckRoleService.check(Role.ADMIN) ? <NavLink to="/branch">
                                <li>
                                    <CpnSvg name="BRANCH" />
                                    <span>Chi nhánh</span>
                                </li>
                            </NavLink> : null}

                            <NavLink to="/employee">
                                <li>
                                    <CpnSvg name="EMPLOYEE" />
                                    <span>Nhân sự</span>
                                </li>
                            </NavLink>

                            <NavLink to="/service">
                                <li>
                                    <CpnSvg name="SERVICE" />
                                    <span>Dịch vụ</span>
                                </li>
                            </NavLink>

                            <NavLink to="/product">
                                <li>
                                    <CpnSvg name="PRODUCT" />
                                    <span>Sản phẩm</span>
                                </li>
                            </NavLink>
                        </ul>
                        : null}



                    <ul className="sidebar-menu">
                        <label>KINH DOANH</label>

                        <NavLink to="/client">
                            <li>
                                <CpnSvg name="CLIENT" />
                                <span>Khách hàng</span>
                            </li>
                        </NavLink>

                        {/* <NavLink to="/ticket">
                            <li>
                                <CpnSvg name="TICKET" />
                                <span>Hồ sơ điều trị</span>
                            </li>
                        </NavLink> */}

                        <NavLink to="/accountant">
                            <li>
                                <CpnSvg name="ACCOUNTANT" />
                                <span>Kế toán</span>
                            </li>
                        </NavLink>

                        {/* <li>
                            <CpnSvg name="WAREHOUSE" />
                            <span>Quản lí kho</span>
                        </li> */}
                    </ul>
                </div>

            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        employee: state.employee
    };
}
export default connect(mapStateToProps, null)(ScreenDashboardSidebar);