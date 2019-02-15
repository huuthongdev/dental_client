import React, { Component, Fragment } from 'react';
import { ScreenDashboardClientDetailTicketsRow, CpnEmptyValue } from '../../../../refs';

class ScreenDashboardClientDetailTickets extends Component {
    render() {
        const { tickets } = this.props.detail;

        if (tickets.length === 0) return <div className="col-sm-12"><CpnEmptyValue message="Khách hàng chưa có hồ sơ điều trị" /></div>
        return (
            <Fragment>
                <div className="col-sm-12">
                    <table>
                        <thead>
                            <tr>
                                <th className="sid">ID</th>
                                <th className="sid">Thời gian</th>
                                <th>Dịch vụ</th>
                                <th>Bác sĩ</th>
                                <th>Trạng thái</th>
                                <th>Phí nợ</th>
                                <th>CN đăng kí</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {tickets.map((value, key) => {
                                return <ScreenDashboardClientDetailTicketsRow value={value} key={key} />
                            })}
                        </tbody>
                    </table>
                </div>
            </Fragment>
        );
    }
}

export default ScreenDashboardClientDetailTickets;