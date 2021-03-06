import React, { Component, Fragment } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { CpnSvg, GetRoleName, CheckRoleService, Role, formatPhoneNumber } from '../../../refs';

class ScreenDashboardEmployeeRow extends Component {
    state = {
        redirectToEmployeeDetail: null
    }

    showRoles(roles) {
        return roles.map((v, i) => <Fragment key={i}>
            {i === 0 ? '' : ','}{GetRoleName(v)}
        </Fragment>)
    }

    showRolesInBranch() {
        const { roleInBranchs } = this.props.item;
        const checkAdmin = CheckRoleService.check(Role.ADMIN);
        return roleInBranchs.map((v, i) => {
            return <Fragment key={i}>
                {checkAdmin ? <Fragment>• <strong>{v.branch.name}</strong> <br /> ({this.showRoles(v.roles)}) <br /></Fragment> : null}
                {!checkAdmin ? <Fragment>• {this.showRoles(v.roles)} <br /></Fragment> : null}
            </Fragment>
        });
    }

    onDetail(_id) {
        return this.setState({ redirectToEmployeeDetail: _id });
    }

    handleRemove() {
        console.log('Handle remove employee');
    }

    render() {
        const { item } = this.props;
        const { redirectToEmployeeDetail } = this.state;

        if (redirectToEmployeeDetail) return <Redirect to={`/employee/${redirectToEmployeeDetail}`} />
        return (
            <Fragment>
                <tr>
                    <td className="sid">
                        <div className="left-row-side" />
                        <div onClick={() => this.onDetail(item._id)} className="link">
                            {item.sid}
                        </div>
                    </td>
                    <td onClick={() => this.onDetail(item._id)} className="link">{item.name}</td>
                    <td>{formatPhoneNumber(item.phone)}</td>
                    <td>{item.email}</td>
                    <td>{item.address}</td>
                    <td>{this.showRolesInBranch()}</td>
                    <td className="list-tools">
                        <button className="row-toggle-list-tools">
                            <CpnSvg name="ARROW_DOWN" />
                        </button>
                        <div className="right-row-side" />
                    </td>
                </tr>
                <tr className="empty">
                </tr>
            </Fragment >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        employee: state.employee
    };
}
export default connect(mapStateToProps, null)(ScreenDashboardEmployeeRow);