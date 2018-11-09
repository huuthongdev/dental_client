import React, { Component, Fragment } from 'react';
import { Svg, GetRoleName } from '../../../refs';

class EmployeeRow extends Component {

    showRoles(roles) {
        return roles.map((v, i) => <Fragment key={i}>
            {i === 0 ? '' : ','}{GetRoleName(v)}
        </Fragment>)
    }

    showRolesInBranch() {
        const { roleInBranchs } = this.props.item;
        return roleInBranchs.map((v, i) => {
            return <Fragment key={i}>
                • { v.branch.name } ({this.showRoles(v.roles)}) <br/>
            </Fragment>
        });
    }

    render() {
        const { item, onDetail } = this.props;
        return (
            <Fragment>
                <tr>
                    <td className="sid">
                        <div className="left-row-side" />
                        {item.sid}
                    </td>
                    <td onClick={() => onDetail()} className="link">{item.name}</td>
                    <td>{item.phone}</td>
                    <td>{item.email}</td>
                    <td>{item.address}</td>
                    <td>{this.showRolesInBranch()}</td>
                    <td className="list-tools">
                        <button className="row-toggle-list-tools">
                            <Svg name="ARROW_DOWN" />
                        </button>

                        {item.isMaster ? null :
                            <button className="row-btn-remove">
                                <Svg name="REMOVE" />
                            </button>}

                        <div className="right-row-side" />
                    </td>
                </tr>
                <tr className="empty">
                </tr>
            </Fragment >
        );
    }
}

export default EmployeeRow;