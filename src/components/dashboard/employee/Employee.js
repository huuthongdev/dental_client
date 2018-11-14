import React, { Component } from 'react';
import { Svg, TitleApp, EmployeeRow, EmployeeCreate, EmployeeDetail, CpnWraper } from '../../../refs';
import { connect } from 'react-redux';

class Employee extends Component {
    state = {
        create: false,
        detail: null
    }

    showList() {
        let { employee } = this.props;
        return employee.map((v, i) => <EmployeeRow onDetail={() => this.onDetail(v)} item={v} key={i} />)
    }

    onCreate() { this.setState({ create: true, detail: null }); }
    onDetail(data) { this.setState({ create: false, detail: data }); }
    returnMain() { this.setState({ create: false, detail: null }) }

    render() {
        const { create, detail } = this.state;
        if (create) return <EmployeeCreate returnMain={() => this.returnMain()}/>
        if (detail) return <EmployeeDetail onCreate={() => this.onCreate()} returnMain={() => this.returnMain()} item={detail}></EmployeeDetail>
        return (
            <CpnWraper>
                <TitleApp sub="Nhân sự" />
                {/* START COMPONENT TITLE */}
                <div className="container-fluid cpn-head">
                    <div className="row align-items-center">
                        <div className="col-sm-6">
                            <div className="cpn-title">
                                <Svg name="EMPLOYEE" />
                                Quản lí nhân sự
                             </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="cpn-tools-list">
                                <button onClick={() => this.onCreate()} className="btn blue">
                                    <Svg name="CREATE" />
                                    Tạo nhân sự
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* END COMPONENT TITLE */}
                {/* START SUBMENU */}
                <ul className="cpn-sub-menu">
                    <li className="active">
                        Nhân sự ({this.props.employee.length})
                </li>
                </ul>
                {/* END SUBMENU */}
                {/* START TABLE TOOLS */}
                <div className="cpn-table-tools">
                    <div className="tool-search">
                        <input type="text" placeholder="Tìm kiếm" />
                        <Svg name="SEARCH" />
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
                                        <th>Họ & Tên</th>
                                        <th>Số điện thoại</th>
                                        <th>Email</th>
                                        <th>Địa chỉ</th>
                                        <th>Chi nhánh - Chức vụ</th>
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.showList()}
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
            </CpnWraper>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        employee: state.employee
    };
}
export default connect(mapStateToProps, null)(Employee);