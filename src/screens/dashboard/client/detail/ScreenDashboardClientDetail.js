import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import {
    ScreenDashboardWraper, CpnFetchingData, TitleApp, CpnSvg, ScreenDashboardClientDetailUpdate, ClientService, ShortKeyService,
    ScreenDashboardClientDetailTickets, convertGender, formatPhoneNumber, ScreenDashboardClientReceiptVoucher, ScreenDashboardTicketDetailReceiptVoucherPopupAdd
} from '../../../../refs';

class ScreenDashboardClientDetail extends Component {
    state = {
        fetching: true,
        // INFO || TICKETS || RECEIPT_VOUCHER
        subMenuActive: "TICKETS",
        client: null,
        goBack: false
    };

    changeSubMenu(menu) {
        return this.setState({ subMenuActive: menu });
    }

    componentWillMount() {
        this.setDetail();
        ShortKeyService.esc(() => this.setState({ goBack: true }));
        const { state } = this.props.location;
        if (state && state.subMenuActive) return this.setState({ subMenuActive: state.subMenuActive });
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.fetching === true) return;
        const { _id } = this.props.match.params;
        const { clientDetail } = nextProps;
        const client = clientDetail.find(v => v._id === _id);
        if (client) return this.setState({ client });
    }

    setDetail() {
        this.setState({ fetching: true });
        // Check Fetched Detail
        const { _id } = this.props.match.params;
        const { clientDetail } = this.props;
        const client = clientDetail.find(v => v._id === _id);
        if (client) return this.setState({ fetching: false, client });
        ClientService.getDetail(_id)
            .then(client => this.setState({ fetching: false, client }));
    }

    render() {
        const { subMenuActive, fetching, client, goBack } = this.state;

        if (goBack) return <Redirect to="/client" />

        if (fetching) {
            return (
                <ScreenDashboardWraper>
                    <CpnFetchingData />
                </ScreenDashboardWraper>
            );
        }

        if (!fetching && !client) return <ScreenDashboardWraper>Không tìm thấy dữ liệu!</ScreenDashboardWraper>;

        // console.log(client);

        const { name, phone, gender, address, district, city, medicalHistory, email } = client;

        let totalDebit = client.tickets && client.tickets.length > 0 ? +client.tickets.map(v => {
            let { receiptVoucher, totalAmount, discountAmount } = v;
            const debitAmount = receiptVoucher && receiptVoucher.length !== 0
                ? totalAmount - receiptVoucher.map(v => v.totalPayment).reduce((a, b) => a + b)
                : totalAmount;
            discountAmount = discountAmount ? +discountAmount : 0;
            const debit = debitAmount - discountAmount;
            return debit && debit > 0 ? debit : 0;
        }).reduce((a, b) => a + b) : 0;

        return (
            <ScreenDashboardWraper>
                <TitleApp sub={`Khách hàng ${client.name}`} />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-6">
                            {/* <div className="cpn-title">
                                <CpnSvg name="CLIENT" />
                                Khách hàng: {client.name}
                            </div> */}
                        </div>

                    </div>
                </div>

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-3">
                            <div className="cpn-client-info" style={{
                                position: 'sticky',
                                top: '60px'
                            }}>
                                <div className="title"><CpnSvg name="TICKET" /> Hồ sơ điều trị
                                <p>KH: {`${name}`}</p>
                                </div>
                                <div className="item">
                                    <div className="label">• Giới tính</div>
                                    <div className="content">{convertGender(gender)}</div>
                                </div>
                                <div className="item">
                                    <div className="label">• Điện thoại</div>
                                    <div className="content">{formatPhoneNumber(phone)}</div>
                                </div>
                                <div className="item">
                                    <div className="label">• Email</div>
                                    <div className="content">{email}</div>
                                </div>
                                <div className="item">
                                    <div className="label">• Địa chỉ</div>
                                    <div className="content">{address && district && city ? `${address} - ${district} - ${city}` : '--'}</div>
                                </div>
                                <div className="item">
                                    <div className="label">• Lịch sử bệnh lí</div>
                                    <div className="content">{medicalHistory && medicalHistory.length !== 0 ? medicalHistory.map((value, key) => <span key={key}>- {value} <br /></span>) : '--'}</div>
                                </div>
                                <div className="item">
                                    <div className="label">• Tổng phí nợ</div>
                                    <div className="content">{totalDebit ? <strong className="text-warning">{`${totalDebit.toLocaleString('vi-VN')}đ`}</strong> : '0đ'}</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-9">
                            <div className="row">
                                <div className="col-sm-12 cpn-head">
                                    <div className="cpn-tools-list">
                                        <Link to={`/client/ticket/new/${client._id}`}>
                                            <button className="btn blue">
                                                <CpnSvg name="CREATE" />
                                                Tạo phiếu điều trị
               					    </button>
                                        </Link>
                                        <Link to="/client">
                                            <button className="btn grey">
                                                <CpnSvg name="BACK" />
                                                Trở lại
               					    </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <ul className="cpn-sub-menu">
                                <li onClick={() => this.changeSubMenu("TICKETS")} className={subMenuActive === "TICKETS" ? "active" : null} >
                                    <CpnSvg name="TICKET" />
                                    Phiếu điều trị {client && client.tickets ? `(${client.tickets.length})` : null}
                                </li>
                                <li onClick={() => this.changeSubMenu("RECEIPT_VOUCHER")} className={subMenuActive === "RECEIPT_VOUCHER" ? "active" : null} >
                                    <CpnSvg name="RECEIPT_VOUCHER" />
                                    Lịch sử thanh toán {client && client.receiptVoucher ? `(${client.receiptVoucher.length})` : null}
                                </li>
                                <li onClick={() => this.changeSubMenu("INFO")} className={subMenuActive === "INFO" ? "active" : null} >
                                    <CpnSvg name="INFO" />
                                    Cập nhật thông tin
                				</li>
                            </ul>

                            {subMenuActive === "INFO" ? <ScreenDashboardClientDetailUpdate detail={client} /> : null}
                            {subMenuActive === "TICKETS" ? <ScreenDashboardClientDetailTickets detail={client} /> : null}
                            {subMenuActive === "RECEIPT_VOUCHER" ? <ScreenDashboardClientReceiptVoucher detail={client} /> : null}
                        </div>
                    </div>
                </div>
            </ScreenDashboardWraper>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        clientDetail: state.clientDetail,
        fetchDataStatus: state.fetchDataStatus
    };
}
export default connect(mapStateToProps)(ScreenDashboardClientDetail);