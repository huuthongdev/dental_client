import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  EmployeeUpdate,
  Svg,
  TitleApp,
  CpnWraper,
  FetchingData,
  setEmployeeDetail,
} from "../../../refs";

class EmployeeDetail extends Component {
  state = {
    fetchDataDetailStatus: false,
    subMenuActive: "INFO",
    goBack: false
  };

  changeSubMenu(menu) {
    return this.setState({ subMenuActive: menu });
  }

  componentDidMount() {
    // Check Fetched Detail
    const { _id } = this.props.match.params;
    const employee = this.props.employee.filter(v => v._id === _id)[0];
    if (employee && employee.detail)
      return this.setState({ fetchDataDetailStatus: true });
    const { dispatch } = this.props;
    dispatch(setEmployeeDetail(_id)).then(() => {
      this.setState({ fetchDataDetailStatus: true });
    });
  }

  render() {
    const { subMenuActive, goBack } = this.state;
    const { _id } = this.props.match.params;
    const { fetchDataStatus } = this.props;

    // Waiting for fetch data store
    if (!fetchDataStatus.employee) {
      return (
        <CpnWraper>
          <FetchingData />
        </CpnWraper>
      );
    }

    // Find employee in branchs store
    const employee = this.props.employee.filter(v => v._id === _id)[0];
    if (!employee) return <CpnWraper>Không tìm thấy dữ liệu!</CpnWraper>;

    // Redirect to employee table
    if (goBack) return <Redirect to="/employee" />;

    return (
      <CpnWraper>
        <TitleApp sub={`Nhân sự ${employee.name}`} />

        <div className="container-fluid cpn-head">
          <div className="row">
            <div className="col-sm-6">
              <div className="cpn-title">
                <Svg name="BRANCH" />
                Nhân sự: {employee.name}
              </div>
            </div>
            <div className="col-sm-6">
              <div className="cpn-tools-list">
                <button
                  className="btn blue"
                  onClick={() => this.setState({ goBack: true })}
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
              </ul>

              {subMenuActive === "INFO" ? (
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
