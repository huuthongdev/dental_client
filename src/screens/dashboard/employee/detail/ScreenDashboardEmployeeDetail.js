import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  ScreenDashboardEmployeeDetailUpdate,
  CpnSvg,
  TitleApp,
  ScreenDashboardWraper,
  FetchingData,
  setEmployeeDetail,
} from "../../../../refs";

class ScreenDashboardEmployeeDetail extends Component {
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
        <ScreenDashboardWraper>
          <FetchingData />
        </ScreenDashboardWraper>
      );
    }

    // Find employee in branchs store
    const employee = this.props.employee.find(v => v._id === _id);
    if (!employee) return <ScreenDashboardWraper>Không tìm thấy dữ liệu!</ScreenDashboardWraper>;

    // Redirect to employee table
    if (goBack) return <Redirect to="/employee" />;

    return (
      <ScreenDashboardWraper>
        <TitleApp sub={`Nhân sự ${employee.name}`} />

        <div className="container-fluid cpn-head">
          <div className="row">
            <div className="col-sm-6">
              <div className="cpn-title">
                <CpnSvg name="EMPLOYEE" />
                {employee.name}
              </div>
            </div>
            <div className="col-sm-6">
              <div className="cpn-tools-list">
                <button className="btn blue" onClick={() => this.setState({ goBack: true })} >
                  <CpnSvg name="BACK" />
                  Trở lại
                </button>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <ul className="cpn-sub-menu">
                <li onClick={() => this.changeSubMenu("INFO")} className={subMenuActive === "INFO" ? "active" : null}>
                   <CpnSvg name="INFO"/> Thông tin chung
                </li>
                <li onClick={() => this.changeSubMenu("PASSWORD")} className={subMenuActive === "PASSWORD" ? "active" : null}>
                   <CpnSvg name="PASSWORD"/> Vai trò
                </li>
              </ul>
            </div>

            {subMenuActive === "INFO" ? (
              <ScreenDashboardEmployeeDetailUpdate item={employee} />
            ) : null}
          </div>
        </div>
      </ScreenDashboardWraper>
    );
  }
}

const mapStateToProps = state => {
  return {
    employee: state.employee,
    fetchDataStatus: state.fetchDataStatus
  };
};
export default connect(mapStateToProps)(ScreenDashboardEmployeeDetail);
