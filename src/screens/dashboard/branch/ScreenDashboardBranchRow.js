import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { CpnSvg } from "../../../refs";

class ScreenDashboardBranchRow extends Component {
  state = {
    onRemove: false,
    onDetail: false
  };

  handleRemove() {
    // TODO: On remove
  }

  onRemove() {

  }

  render() {
    const { item } = this.props;
    const { onDetail } = this.state;

    if (onDetail) return <Redirect to={`/branch/${item._id}`} />;
    return (
      <Fragment>
        <tr>
          <td className="sid">
            <div className="left-row-side" />
            {item.sid}
          </td>

          <td
            onClick={() => this.setState({ onDetail: true })}
            className="link"
          >
            {item.name} {item.isMaster ? "(Trụ sở)" : ""}
          </td>

          <td> {item.address ? item.address : "--"} </td>

          <td>{item.district ? item.district : "--"}</td>

          <td>{item.city ? item.city : "--"}</td>

          <td>{item.phone ? item.phone : "--"}</td>

          <td className="list-tools">
            <button className="row-toggle-list-tools">
              <CpnSvg name="ARROW_DOWN" />
            </button>

            <div className="right-row-side" />
          </td>
        </tr>

        <tr className="empty" />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    branch: state.branch
  };
};
export default connect(mapStateToProps)(ScreenDashboardBranchRow);
