import React, { Component, Fragment } from "react";
import { CpnSvg, FetchingData, GetRoleName } from "../../../../refs";
import { connect } from 'react-redux';

class ScreenDashboardBranchDetailEmployees extends Component {
  render() {
    const { loaded, _id } = this.props;
    const branch = this.props.branch.find(v => v._id === _id);
    const employees = branch.detail && branch.detail.employees ? branch.detail.employees : [];

    if (!loaded) return <FetchingData />
    if (loaded && employees.length === 0) return <div className="col-sm-12 text-center">Không có dữ liệu</div>
    return (
      <div className="col-sm-12">
        <table>
          <thead>
            <tr>
              <th className="sid">ID</th>
              <th>Tên nhân viên</th>
              <th>Số điện thoại</th>
              <th>Email</th>
              <th>Địa chỉ</th>
              <th>Chức vụ</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((v, i) => (
              <Fragment key={i}>
                <tr>
                  <td className="sid">
                    <div className="left-row-side" />
                    {v.user.sid}
                  </td>
                  <td className="link"> {v.user.name}</td>
                  <td> {v.user.phone} </td>
                  <td> {v.user.email} </td>
                  <td> {v.user.address}{v.user.district ? ' - ' + v.user.district : null}{v.user.city ? ' - ' + v.user.city : null} </td>
                  <td> {v.roles.map((v, i) => <span key={i}> • {GetRoleName(v)} <br /></span>)} </td>
                  <td className="list-tools">
                    <button className="row-toggle-list-tools">
                      <CpnSvg name="ARROW_DOWN" />
                    </button>

                    <button className="row-btn-remove">
                      <CpnSvg name="REMOVE" />
                    </button>

                    <div className="right-row-side" />
                  </td>
                </tr>
                <tr className="empty" />
              </Fragment>
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
    );
  }
}

const mapStateToProps = (state) => {
  return {
    branch: state.branch
  };
}
export default connect(mapStateToProps)(ScreenDashboardBranchDetailEmployees);
