import React, { Component, Fragment } from 'react';
import { Svg } from '../../../refs';

class BranchDetailEmployees extends Component {

    showList() {
        const { items } = this.props;
        return items.map((v, i) => (
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
                <tr className="empty">
                </tr>
            </Fragment>
        ));
    }

    render() {
        return (
            <Fragment>
                {/* START TABLE */}
                <table>
                    <thead>
                        <tr>
                            <th className="sid">ID</th>
                            <th>Tên nhân viên</th>
                            <th>Số điện thoại</th>
                            <th>Số - Tên đường</th>
                            {/* <th>Vai trò</th> */}
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>

                        {this.showList()}

                    </tbody>
                </table>
                {/* END TABLE */}
                {/* START PAGING */}
                <div className="paging">
                    <ul>
                        <li className="active">1</li>
                        <li>2</li>
                        <li>3</li>
                        <li>4</li>
                        <li>5</li>
                    </ul>
                </div>
                {/* END PAGING */}
            </Fragment>
        );
    }
}

export default BranchDetailEmployees;