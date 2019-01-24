import React, { Component, Fragment } from 'react';
import { CpnEmptyValue } from '../../../../refs';

class ScreenDashboardTicketDetailServicesInfo extends Component {
    render() {
        const { items } = this.props.ticket;

        const isEmpty = items.length === 0;
        return (
            <Fragment>
                <div className="row">
                    <div className="col-sm-12">
                        {isEmpty
                            ? <CpnEmptyValue />
                            : <table className="table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Tên dịch vụ</th>
                                        <th>Số lượng</th>
                                        {/* <th>Chi phí</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((value, key) => <Fragment key={key}>
                                        <tr>
                                            <td className="sid" style={{ width: '50px' }}>
                                                <div className="left-row-side" />
                                                {key + 1}
                                            </td>
                                            <td>
                                                {value.service.name}
                                            </td>
                                            <td>
                                                {value.qty} ({value.service.unit})
                                                <div className="right-row-side" />
                                            </td>
                                        </tr>
                                        <tr className="empty" />
                                    </Fragment>)}
                                </tbody>
                            </table>}
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default ScreenDashboardTicketDetailServicesInfo;