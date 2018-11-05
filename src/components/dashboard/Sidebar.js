import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { LogoBlue, AvatarDemo, Svg } from '../../refs';

class Sidebar extends Component {
    render() {
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
                        <h4>Nguyên Khang</h4>
                        <p>Quản lí nha sĩ</p>
                    </div>
                    <ul className="sidebar-menu">

                        <NavLink exact to="/">
                            <li>
                                <Svg name="HOME" />
                                <span>Thông tin chung</span>
                            </li>
                        </NavLink>

                        <NavLink exact to="/branch">
                            <li>
                                <Svg name="BRANCH" />
                                <span>Chi nhánh</span>
                            </li>
                        </NavLink>

                        <NavLink exact to="/employee">
                            <li>
                                <Svg name="EMPLOYEE" />
                                <span>Nhân sự</span>
                            </li>
                        </NavLink>
                        
                        <li>
                            <Svg name="SERVICE" />
                            <span>Dịch vụ</span>
                        </li>
                        <li>
                            <Svg name="PRODUCT" />
                            <span>Sản phẩm</span>
                        </li>
                        <li>
                            <Svg name="CLIENT" />
                            <span>Khách hàng</span>
                        </li>
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

export default Sidebar;