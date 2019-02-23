import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from "react-router-dom";
import { ScreenDashboardWraper, ClientService, CpnEmptyValue, CpnFetchingData, CpnSvg, convertGender, formatPhoneNumber } from '../../../../refs';

class ScreenClientDetailWraper extends Component {
    state = {
        fetching: true,
        // INFO || TICKETS || RECEIPT_VOUCHER
        subMenuActive: "TICKETS",
        client: null
    };

    changeSubMenu(menu) {
        return this.setState({ subMenuActive: menu });
    }

    componentWillMount() {
        this.setDetail();
    }

    componentWillReceiveProps() {
        if (this.state.fetching === true) return;
        this.setDetail();
    }

    setDetail() {
        this.setState({ fetching: true });
        // Check Fetched Detail
        const { _id } = this.props.match.params;
        ClientService.setDetail(_id)
            .then(client => this.setState({ fetching: false, client: client }));
    }

    render() {
        const { fetching, client } = this.state;

        if (fetching) return <CpnFetchingData dashboardWraper />
        if (!client) return <CpnEmptyValue dashboardWraper message="Không tim thấy khách hàng!" />

        let totalDebit = client.tickets && client.tickets.length > 0 ? +client.tickets.map(v => {
            let { receiptVoucher, totalAmount, discountAmount } = v;
            const debitAmount = receiptVoucher && receiptVoucher.length !== 0
                ? totalAmount - receiptVoucher.map(v => v.totalPayment).reduce((a, b) => a + b)
                : totalAmount;
            discountAmount = discountAmount ? +discountAmount : 0;
            const debit = debitAmount - discountAmount;
            return debit && debit > 0 ? debit : 0;
        }).reduce((a, b) => a + b) : 0;

        const { name, phone, gender, address, district, city, medicalHistory, email } = client;
        const { title, subBox } = this.props;

        return (
            <ScreenDashboardWraper title={`Khách hàng ${client.name}`}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-6">
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
                                <div className="title"><CpnSvg name="TICKET" /> Hồ sơ khách hàng
                                <p>KH: {`${name}`}</p>
                                </div>
                                <div className="item">
                                    <div className="label">• Giới tính</div>
                                    <div className="content">{convertGender(gender)}</div>
                                </div>
                                <div className="item">
                                    <div className="label">• Điện thoại</div>
                                    <div className="content">{formatPhoneNumber(phone, '--')}</div>
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
                                    {title ? <div className="cpn-sub-head">
                                        <div className="title">{title}</div>
                                        <Link to={`/client/${client._id}`}>
                                            <button className="btn grey">
                                                <CpnSvg name="BACK" />
                                                Trở lại
               					            </button>
                                        </Link>
                                    </div> : null}

                                    {!subBox ? <div className="cpn-tools-list">
                                        <Link to={`/client/${client._id}/ticket/new`}>
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
                                    </div> : null}
                                </div>
                            </div>

                            {this.props.render({ ...this.state, ...this.props })}

                        </div>
                    </div>
                </div>
            </ScreenDashboardWraper>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        clientDetail: state.clientDetail
    };
}
export default connect(mapStateToProps)(withRouter(ScreenClientDetailWraper));