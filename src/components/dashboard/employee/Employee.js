import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  Svg,
  TitleApp,
  EmployeeRow,
  CpnWraper,
  FetchingData
} from "../../../refs";

class Employee extends Component {
  state = { create: false };

  render() {
    const { create } = this.state;
    const { fetchDataStatus, employee } = this.props;

    // Show Create Form
    if (create) return <Redirect to="/employee/create" />;

    // Show Employees Table
    return (
      <CpnWraper>
        <TitleApp sub="Nhân sự" />
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
                <button
                  onClick={() => this.setState({ create: true })}
                  className="btn blue"
                >
                  <Svg name="CREATE" />
                  Tạo nhân sự
                </button>
              </div>
            </div>
          </div>
        </div>

        <ul className="cpn-sub-menu">
          <li className="active">Nhân sự ({this.props.employee.length})</li>
        </ul>

        {!fetchDataStatus.branch ? <FetchingData /> : null}
        {fetchDataStatus.branch ? (
          <Fragment>
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
              <div className="tool-reset">Reset</div>
            </div>
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
                      {employee.map((v, i) => (
                        <EmployeeRow item={v} key={i} />
                      ))}
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
          </Fragment>
        ) : null}
      </CpnWraper>
    );
  }
}

const mapStateToProps = state => {
  return {
    employee: state.employee,
    fetchDataStatus: state.fetchDataStatus
  };
};
export default connect(
  mapStateToProps,
  null
)(Employee);
