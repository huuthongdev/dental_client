import React, { Component, Fragment } from 'react';
import { CpnSvg, convertStatus, TimeUtils } from '../../../../refs';

class ScreenDashboardTicketDetailCalendarRow extends Component {
    render() {
        const { startTime, endTime, content, dentist, status, sid } = this.props.item;

        return (
            <Fragment>
                <tr>
                    <td className="sid">
                        <div className="left-row-side" />
                        {sid}
                    </td>
                    <td>
                        {endTime < Date.now() ? <p className="text-danger"><strong>Hết hạn</strong></p> : <Fragment>
                            <strong>{new Date(startTime).toLocaleDateString('en-GB')} | {new Date(startTime).toLocaleTimeString('en-GB')}</strong> <br />
                            (Còn lại {TimeUtils.between(startTime, Date.now())})
                        </Fragment>}
                    </td>
                    <td>
                        {TimeUtils.between(startTime, endTime, true)}
                    </td>
                    <td>
                        {content}
                    </td>
                    <td>
                        {dentist.name}
                    </td>
                    <td>
                        <div className={`box-item ${status === 'PENDING' ? 'orange'
                            : status === 'DONE' ? 'green'
                                : status === 'WORKING' ? 'blue'
                                    : ''}`}>
                            {convertStatus(status)}
                        </div>
                    </td>
                    <td className="list-tools">
                        <button className="row-toggle-list-tools">
                            <CpnSvg name="ARROW_DOWN" />
                            <div className="row-list-tools">
                                <div onClick={() => this.setState({ onDetail: true })} className="item">
                                    <CpnSvg name="INFO" />
                                    Chi tiết
                                </div>
                                <div className="item">
                                    <CpnSvg name="MONEY_CHECK" />
                                    Thanh toán
                                </div>
                            </div>
                        </button>

                        <div className="right-row-side" />
                    </td>
                </tr>
                <tr className="empty" />
            </Fragment>
        );
    }
}

export default ScreenDashboardTicketDetailCalendarRow;