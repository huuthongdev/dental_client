import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
    ScreenDashboardWraper, TicketService, CpnFetchingData, CpnSvg, convertGender,
    ScreenDashboardTicketDetailCalendar, ScreenDashboardTicketDetailCalendarPopupAdd,
    ScreenDashboardTicketDetailReceiptVoucher, ScreenDashboardTicketDetailReceiptVoucherPopupAdd, ScreenDashboardTicketDetailServicesInfo
} from '../../../../refs';

class ScreenDashboardTicketDetail extends Component {
    state = {
        goBack: false,
        fetching: true,
        // CALENDAR || RECEIPT_VOUCHER || SERVICES
        tabActive: "SERVICES_INFO",
        ticket: null,
        isCreateCalendar: false,
        isCreateReceiptVoucher: false
    };

    changeSubMenu(menu) {
        return this.setState({ tabActive: menu });
    }

    goBackNavigation() {
        this.setState({ navigation: 'MAIN' });
    }

    getDetail() {
        this.setState({ fetching: true });
        // Check Fetched Detail
        const { _id } = this.props.match.params;
        const { ticketDetail } = this.props;


        const ticket = ticketDetail.find(v => v._id === _id);

        if (ticket) return this.setState({
            ticket,
            fetching: false
        });

        TicketService.getDetail(_id)
            .then(ticket => this.setState({
                ticket,
                fetching: false
            }));
    }

    componentDidMount() {
        this.getDetail();
        const { state } = this.props.location;
        this.setState({
            isCreateCalendar: state && state.ccl,
            isCreateReceiptVoucher: state && state.payment
        });
    }

    render() {
        const { fetching, ticket, tabActive, isCreateCalendar, isCreateReceiptVoucher, goBack } = this.state;
        const { state } = this.props.location;

        if (goBack) return <Redirect to={{
            pathname: state && state.from && state.from.pathname ? state.from.pathname : '/',
            state: {
                subMenuActive: 'TICKETS'
            }
        }} />

        if (fetching) {
            return (
                <ScreenDashboardWraper>
                    <CpnFetchingData />
                </ScreenDashboardWraper>
            );
        }

        if (!fetching && !ticket) return <ScreenDashboardWraper>Không tìm thấy dữ liệu!</ScreenDashboardWraper>;

        const { gender, name, phone, city, district, address, medicalHistory } = ticket.client;
        const { totalAmount, dentistResponsible, receiptVoucher } = ticket;

        const debitAmount = receiptVoucher && receiptVoucher.length !== 0
            ? totalAmount - receiptVoucher.map(v => v.totalPayment).reduce((a, b) => a + b)
            : totalAmount;

        return (
            <ScreenDashboardWraper title={`Hồ sơ KH: ${ticket.client.name}`}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-3">
                            <div className="cpn-client-info">
                                <div className="title"><CpnSvg name="TICKET" /> Hồ sơ điều trị
                                <p>KH: {`${name}`}</p>
                                </div>
                                <div className="item">
                                    <div className="label">• Giới tính</div>
                                    <div className="content">{convertGender(gender)}</div>
                                </div>
                                <div className="item">
                                    <div className="label">• Điện thoại</div>
                                    <div className="content">{phone}</div>
                                </div>
                                <div className="item">
                                    <div className="label">• Địa chỉ</div>
                                    <div className="content">{`${address} - ${district} - ${city}`}</div>
                                </div>
                                <div className="item">
                                    <div className="label">• Lịch sử bệnh lí</div>
                                    <div className="content">{medicalHistory.map((value, key) => <span key={key}>- {value} <br /></span>)}</div>
                                </div>
                                <div className="item">
                                    <div className="label">• Bác sĩ phụ trách</div>
                                    <div className="content">{dentistResponsible.name}</div>
                                </div>
                                <div className="item">
                                    <div className="label">• Phí nợ</div>
                                    {debitAmount === 0
                                        ? <p className="text-success"><strong>Đã thanh toán đủ</strong></p>
                                        : <div className="content text-danger"><strong>{debitAmount.toLocaleString()}</strong></div>}

                                </div>
                            </div>
                        </div>
                        <div className="col-sm-9">

                            <div className="cpn-tools-list">
                                <button className="btn blue" onClick={() => this.setState({ isCreateCalendar: true })}>
                                    <CpnSvg name="CREATE" />
                                    Tạo lịch hẹn
                            </button>
                                {debitAmount !== 0 ? <button className="btn blue" onClick={() => this.setState({ isCreateReceiptVoucher: true })}>
                                    <CpnSvg name="CREATE" />
                                    Thu phí
                            </button> : null}
                                <button onClick={() => this.setState({ goBack: true })} className="btn grey">
                                    <CpnSvg name="BACK" />
                                    Trở lại
                                    </button>
                            </div>

                            <div className="row">
                                <div className="col-sm-12">
                                    <ul className="cpn-sub-menu">
                                        <li onClick={() => this.changeSubMenu("SERVICES_INFO")} className={tabActive === "SERVICES_INFO" ? "active" : null} >
                                            <CpnSvg name="SERVICE" />
                                            Thông tin dịch vụ
                                    </li>
                                        <li onClick={() => this.changeSubMenu("CALENDAR")} className={tabActive === "CALENDAR" ? "active" : null} >
                                            <CpnSvg name="DATE" />
                                            Lịch điều trị ({ticket.calendar.length})
                                    </li>
                                        <li onClick={() => this.changeSubMenu("RECEIPT_VOUCHER")} className={tabActive === "RECEIPT_VOUCHER" ? "active" : null} >
                                            <CpnSvg name="MONEY_CHECK" />
                                            Lịch sử thanh toán ({ticket.receiptVoucher.length})
                                    </li>
                                    </ul>
                                </div>

                                <div className="col-sm-12">
                                    {tabActive === 'SERVICES_INFO' ? <ScreenDashboardTicketDetailServicesInfo ticket={ticket} /> : null}
                                    {tabActive === 'CALENDAR' ? <ScreenDashboardTicketDetailCalendar ticket={ticket} /> : null}
                                    {tabActive === 'RECEIPT_VOUCHER' ? <ScreenDashboardTicketDetailReceiptVoucher ticket={ticket} /> : null}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {isCreateCalendar ? <ScreenDashboardTicketDetailCalendarPopupAdd
                    dentistResponsible={dentistResponsible}
                    ticketId={ticket._id}
                    goBack={() => {
                        this.getDetail();
                        this.setState({ isCreateCalendar: false });
                    }}
                /> : null}

                {isCreateReceiptVoucher ? <ScreenDashboardTicketDetailReceiptVoucherPopupAdd
                    ticketId={ticket._id}
                    clientId={ticket.client._id}
                    debitAmount={debitAmount}
                    goBack={() => {
                        this.getDetail();
                        this.setState({ isCreateReceiptVoucher: false });
                    }}
                /> : null}
            </ScreenDashboardWraper>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ticketDetail: state.ticketDetail
    };
}
export default connect(mapStateToProps)(ScreenDashboardTicketDetail);