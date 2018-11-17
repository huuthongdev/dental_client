import React, { Component, Fragment } from "react";
import { Svg, FetchingData } from "../../../refs";
import { connect } from 'react-redux';

class BranchDetailEmployees extends Component {
  render() {
    const { loaded, _id } = this.props;
    const branch = this.props.branch.filter(v => v._id === _id)[0];
    const employees = branch.detail.employees;

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
              <th>Số - Tên đường</th>
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
                  <td> {v.user.name}</td>
                  <td> {v.user.phone} </td>
                  <td> {v.user.address} </td>
                  <td className="list-tools">
                    <button className="row-toggle-list-tools">
                      <Svg name="ARROW_DOWN" />
                    </button>

                    <button className="row-btn-remove">
                      <Svg name="REMOVE" />
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
export default connect(mapStateToProps, null)(BranchDetailEmployees);
