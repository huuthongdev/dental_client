import React, { Component, Fragment } from 'react';
import { Svg, convertStatus } from '../../../../refs';

class TicketDetailCalendarRow extends Component {
    render() {
        const { startTime, endTime, content, dentist, status } = this.props.item;
        console.log(this.props.item);
        return (
            <Fragment>
                <tr>
                    <td>
                        <div className="left-row-side" />
                        {new Date(startTime).toLocaleDateString('en-GB')} | {new Date(startTime).toLocaleTimeString('en-GB')}
                    </td>
                    <td>
                        {new Date(endTime).toLocaleDateString('en-GB')} | {new Date(endTime).toLocaleTimeString('en-GB')}
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
                            <Svg name="ARROW_DOWN" />
                            <div className="row-list-tools">
                                <div onClick={() => this.setState({ onDetail: true })} className="item">
                                    <Svg name="INFO" />
                                    Chi tiết
                                </div>
                                <div className="item">
                                    <Svg name="MONEY_CHECK" />
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

export default TicketDetailCalendarRow;