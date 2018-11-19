import React, { Component, Fragment } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { Svg, GetRoleName, onConfirmRemove } from '../../../refs';

class EmployeeRow extends Component {
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
        return roleInBranchs.map((v, i) => {
            return <Fragment key={i}>
                • {v.branch.name} ({this.showRoles(v.roles)}) <br />
            </Fragment>
        });
    }

    onDetail(_id) {
        return this.setState({ redirectToEmployeeDetail: _id });
    }

    handleRemove() {
        console.log('Handle remove employee');
    }

    onRemove(e) {
        const { item } = this.props;
        e.preventDefault();
        const { dispatch } = this.props;
        dispatch(onConfirmRemove(
            item.name,
            "Xoá nhân sự có thể ảnh hưởng đến dữ liệu của nhân sự bao gồm: Chi nhánh, Phiếu điều trị, các khách hàng liên quan",
            "nhân sự",
            () => this.handleRemove()
        ))
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
                        {item.sid}
                    </td>
                    <td onClick={() => this.onDetail(item._id)} className="link">{item.name}</td>
                    <td>{item.phone}</td>
                    <td>{item.email}</td>
                    <td>{item.address}</td>
                    <td>{this.showRolesInBranch()}</td>
                    <td className="list-tools">
                        <button className="row-toggle-list-tools">
                            <Svg name="ARROW_DOWN" />
                        </button>

                        <button onClick={e => this.onRemove(e)} className="row-btn-remove">
                            <Svg name="REMOVE" />
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
export default connect(mapStateToProps, null)(EmployeeRow);