import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { TimeUtils, CalendarDentistService, CpnSvg } from '../../../refs';

class ScreenDashboardCalendarsTodayRow extends Component {
    state = {
        loading: false,
        redirectToTicketDetail: false
    }

    handleChangeStatus = (_id, status) => {
        this.setState({ loading: true });
        CalendarDentistService.changeStatus(_id, status)
            .then(() => this.setState({ loading: false }));
    }

    render() {
        const { loading, redirectToTicketDetail } = this.state;
        const { sid, startTime, ticket, content, dentist, status, _id } = this.props.value;

        if (redirectToTicketDetail) return <Redirect to={`/ticket/${redirectToTicketDetail}`} />
        return <Fragment>
            <tr>
                <td>
                    <div className="left-row-side" />
                    {sid}
                </td>
                <td>
                    {startTime < Date.now() ? <strong className="text-danger">Hết hạn <br /></strong> : null}
                    <strong>{new Date(startTime).toLocaleDateString('en-GB')} </strong>  <br /> {new Date(startTime).toLocaleTimeString('en-GB')}<br />
                    {!(startTime < Date.now()) ? <span>(Còn lại {TimeUtils.between(startTime, Date.now())})</span> : null}

                </td>
                <td>
                    {ticket.client.name}
                </td>
                <td>
                    {content}
                </td>
                <td>
                    {dentist.name}
                </td>
                <td>
                    <div className={`box-item ${status === 'PENDING' ? 'purple'
                        : status === 'DONE' ? 'green'
                            : status === 'WORKING' ? 'orange'
                                : ''}`}>
                        {CalendarDentistService.convertStatus(status)}
                    </div>
                </td>
                <td>
                    {loading ? <div className="loading-icon green" /> : null}
                    {!loading ? <button className="row-toggle-list-tools">
                        <CpnSvg name="ARROW_DOWN" />
                        <div className="row-list-tools">
                            <div onClick={() => this.setState({ redirectToTicketDetail: ticket._id })} className="item">
                                <CpnSvg name="INFO" />
                                Xem hồ sơ
                            </div>
                            <div onClick={() => this.handleChangeStatus(_id, 'PENDING')} className="item">
                                <CpnSvg name="DATE" />
                                C: Đợi
                            </div>
                            <div onClick={() => this.handleChangeStatus(_id, 'WORKING')} className="item">
                                <CpnSvg name="DATE" />
                                C: Đang điều trị
                            </div>
                            <div onClick={() => this.handleChangeStatus(_id, 'DONE')} className="item">
                                <CpnSvg name="DATE" />
                                C: Hoàn thành
                            </div>
                        </div>
                    </button> : null}
                    <div className="right-row-side" />
                </td>
            </tr>
            <tr className="empty" />
        </Fragment>
    }
}

export default ScreenDashboardCalendarsTodayRow;