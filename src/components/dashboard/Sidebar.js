import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { LogoBlue, AvatarDemo, Svg, GetRoleName } from '../../refs';
import { connect } from 'react-redux';

class Sidebar extends Component {

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
        const { user } = this.props;

        return (
            <Fragment>
                <div className="sidebar">
                    <div className="side-bar-logo">
                        <img src={LogoBlue} alt="Dental Application" />
                    </div>
                    <div className="side-bar-user-info">
                        <div className="avatar" style={{ background: `url("${AvatarDemo}") no-repeat center center` }}>
                            <Svg name="SETTING" />
                        </div>
                        <h4>{user.name}</h4>
                        <ul>{this.showRolesCurrentBranch()}</ul>
                    </div>
                    <ul className="sidebar-menu">

                        <NavLink to="/dashboard/main">
                            <li>
                                <Svg name="HOME" />
                                <span>Thông tin chung</span>
                            </li>
                        </NavLink>

                        <NavLink to="/dashboard/branch">
                            <li>
                                <Svg name="BRANCH" />
                                <span>Chi nhánh</span>
                            </li>
                        </NavLink>

                        <NavLink to="/dashboard/employee">
                            <li>
                                <Svg name="EMPLOYEE" />
                                <span>Nhân sự</span>
                            </li>
                        </NavLink>

                        <NavLink to="/dashboard/service">
                            <li>
                                <Svg name="SERVICE" />
                                <span>Dịch vụ</span>
                            </li>
                        </NavLink>

                        <NavLink to="/dashboard/product">
                            <li>
                                <Svg name="PRODUCT" />
                                <span>Sản phẩm</span>
                            </li>
                        </NavLink>

                        <NavLink to="/dashboard/client">
                            <li>
                                <Svg name="CLIENT" />
                                <span>Khách hàng</span>
                            </li>
                        </NavLink>
                        
                        <li>
                            <Svg name="ACCOUNTANT" />
                            <span>Kế toán</span>
                        </li>
                        <li>
                            <Svg name="WAREHOUSE" />
                            <span>Quản lí kho</span>
                        </li>
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
export default connect(mapStateToProps, null)(Sidebar);