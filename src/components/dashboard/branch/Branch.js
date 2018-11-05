import React, { Component } from 'react';
import { Dashboard, TitleApp, Svg } from '../../../refs';

class Branch extends Component {
    render() {
        return (
            <Dashboard>
                <TitleApp sub="Branch" />
                <div>
                    {/* START COMPONENT TITLE */}
                    <div className="container-fluid cpn-head">
                        <div className="row align-items-center">
                            <div className="col-sm-6">
                                <div className="cpn-title">
                                    <Svg name="BRANCH" />
                                    Quản lí chi nhánh
                                 </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="cpn-tools-list">
                                    <button className="btn blue">
                                        <Svg name="CREATE" />
                                        Tạo chi nhánh
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* END COMPONENT TITLE */}
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
                    {/* START TABLE TOOLS */}
                    <div className="cpn-table-tools">
                        <div className="tool-search">
                            <input type="text" placeholder="Tìm kiếm" />
                            <Svg name="SEARCH"/>
                        </div>
                        <div className="tool-select">
                            <select>
                                <option value={1}>Tất cả</option>
                                <option value={1}>A - Z</option>
                                <option value={1}>Z - A</option>
                            </select>
                        </div>
                        <div className="tool-reset">
                            Reset
    </div>
                    </div>
                    {/* END TABLE TOOLS */}
                    {/* START BRANCH TABLE */}
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-12">
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
                                <div className="paging">
                                    <ul>
                                        <li className="active">1</li>
                                        <li>2</li>
                                        <li>3</li>
                                        <li>4</li>
                                        <li>5</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* END BRANCH TABLE */}
                </div>

            </Dashboard>
        );
    }
}

export default Branch;