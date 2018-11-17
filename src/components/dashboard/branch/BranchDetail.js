import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  Svg,
  BranchUpdate,
  FetchingData,
  TitleApp,
  CpnWraper,
  BranchDetailEmployees,
  setBranchDetail
} from "../../../refs";

class BranchDetail extends Component {
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
    const branch = this.props.branch.filter(v => v._id === _id)[0];
    if (branch && branch.detail)
      return this.setState({ fetchDataDetailStatus: true });
    const { dispatch } = this.props;
    dispatch(setBranchDetail(_id)).then(() => {
      this.setState({ fetchDataDetailStatus: true });
    });
  }

  render() {
    const { subMenuActive, fetchDataDetailStatus, goBack } = this.state;
    const { _id } = this.props.match.params;
    const { fetchDataStatus } = this.props;

    // Waiting for fetch data store
    if (!fetchDataStatus.branch) {
      return (
        <CpnWraper>
          <FetchingData />
        </CpnWraper>
      );
    }

    // Find branch in branchs store
    const branch = this.props.branch.filter(v => v._id === _id)[0];
    if (!branch) return <CpnWraper>Không tìm thấy dữ liệu!</CpnWraper>;

    // Redirect to branch table
    if (goBack) return <Redirect to="/branch" />;

    return (
      <CpnWraper>
        <TitleApp sub={`Chi nhánh ${branch.name}`} />

        <div className="container-fluid cpn-head">
          <div className="row">
            <div className="col-sm-6">
              <div className="cpn-title">
                <Svg name="BRANCH" />
                Chi nhánh: {branch.name}
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
                <li
                  onClick={() => this.changeSubMenu("EMPLOYEES")}
                  className={subMenuActive === "EMPLOYEES" ? "active" : null}
                >
                  Nhân sự
                </li>
              </ul>
            </div>

            {subMenuActive === "INFO" ? <BranchUpdate item={branch} /> : null}
            {subMenuActive === "EMPLOYEES" ? (
              <BranchDetailEmployees
                loaded={fetchDataDetailStatus}
                _id={branch._id}
              />
            ) : null}
          </div>
        </div>
      </CpnWraper>
    );
  }
}

const mapStateToProps = state => {
  return {
    branch: state.branch,
    fetchDataStatus: state.fetchDataStatus
  };
};
export default connect(
  mapStateToProps,
  null
)(BranchDetail);
