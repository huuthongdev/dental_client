import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  EmployeeUpdate,
  Svg,
  TitleApp,
  CpnWraper,
  FetchingData
} from "../../../refs";

class EmployeeDetail extends Component {
  state = {
    fetchDataDetailStatus: false,
    dataDetail: null,
    subMenuActive: "INFO",
    onBack: false
  };

  onBack() {
    if (!this.state.onBack) return;
    return <Redirect to="/employee" />;
  }

  render() {
    const { _id } = this.props.match.params;
    const { fetchDataStatus } = this.props;
    const { subMenuActive, fetchDataDetailStatus } = this.state;
    const employee = this.props.employee.filter(v => v._id === _id)[0];

    if (!fetchDataStatus.employee)
      return (
        <CpnWraper>
          <FetchingData />
        </CpnWraper>
      );
    if (!employee) return <CpnWraper>Không tìm thấy dữ liệu</CpnWraper>;
    return (
      <CpnWraper>
        <TitleApp sub={`Nhân sự ${employee ? employee.name : null}`} />
        {this.onBack()}

        <div className="container-fluid cpn-head">
          <div className="row">
            <div className="col-sm-6">
              <div className="cpn-title">
                <Svg name="BRANCH" />
                 Nhân sự: {employee ? employee.name : null}
              </div>
            </div>
            <div className="col-sm-6">
              <div className="cpn-tools-list">
                <button
                  className="btn blue"
                  onClick={() => this.setState({ onBack: true })}
                >
                  <Svg name="BACK" />
                  Trở lại
                </button>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <ul className="cpn-sub-menu">
                <li
                  onClick={() => this.changeSubMenu("INFO")}
                  className={subMenuActive === "INFO" ? "active" : null}
                >
                  Thông tin chung
                </li>
                <li
                  onClick={() => this.changeSubMenu("EMPLOYEES")}
                  className={subMenuActive === "EMPLOYEES" ? "active" : null}
                >
                  Nhân sự
                </li>
              </ul>

              {!fetchDataDetailStatus ? <FetchingData /> : null}
              {fetchDataDetailStatus && subMenuActive === "INFO" ? (
                <EmployeeUpdate item={employee} />
              ) : null}
            </div>
          </div>
        </div>
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
)(EmployeeDetail);
