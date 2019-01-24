import React, { Component, Fragment } from 'react';
import ReactToPrint from "react-to-print";
import './ReceiptVoucherPrint.scss';
import { CpnSvg } from '../refs';

class ComponentToPrint extends React.Component {
    render() {
        // const { } = this.props.ticket;
        if (!this.props.detail) return <Fragment></Fragment>
        const { client, ticket, totalPayment, _id, createAt, cashier } = this.props.detail;
        const totalBefore = ticket.receiptVoucher.filter(v => v._id !== _id && v.createAt < createAt).length === 0 ? 0 : ticket.receiptVoucher.filter(v => v._id !== _id).map(v => v.totalPayment).reduce((a, b) => a + b);
        const total = ticket.items.map(v => v.service.suggestedRetailerPrice * v.qty).reduce((a, b) => a + b);
        return (
            <Fragment>
                <div className="receipt-voucher-print">
                    <div className="head">
                        <div className="logo">
                            <CpnSvg name="LOGO" />
                        </div>
                        <div className="title">
                            HOÁ ĐƠN THU PHÍ DỊCH VỤ
                        </div>
                    </div>
                    <div className="body">
                        <div className="tab-title">
                            Thông tin khách hàng
                        </div>
                        <table className="client-info">
                            <tbody>
                                <tr>
                                    <td>Tên khách hàng: <span>{client.name} ({client.phone})</span></td>
                                </tr>
                                <tr>
                                    <td>Địa chỉ: <span>{client.address} - {client.district} - {client.city}</span></td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="tab-title">
                            Chi tiết hoá đơn
                        </div>
                        <table>
                            <tbody>
                                <tr className="dashed-bottom">
                                    <td>Dịch vụ</td>
                                    <td>Số lượng</td>
                                    <td className="text-right">Đơn giá</td>
                                    <td className="text-right">Tổng</td>
                                </tr>
                                {ticket.items.map((value, key) => <tr key={key} className={`${key === ticket.items.length - 1 ? 'dashed-bottom' : ''}`}>
                                    <td><span>{value.service.name}</span></td>
                                    <td><span>x{value.qty} ({value.service.unit})</span></td>
                                    <td className="text-right"><span>{value.service.suggestedRetailerPrice.toLocaleString('en-GB')}đ</span></td>
                                    <td className="text-right"><span>{(value.service.suggestedRetailerPrice * value.qty).toLocaleString('en-GB')}đ</span></td>
                                </tr>)}

                                <tr>
                                    <td colSpan={3} className="text-right">Tạm tính</td>
                                    <td className="text-right"><span>{total.toLocaleString('en-GB')}đ</span></td>
                                </tr>
                                <tr className="dashed-bottom">
                                    <td colSpan={3} className="text-right">Giảm giá</td>
                                    <td className="text-right"><span>-0đ</span></td>
                                </tr>
                                <tr>
                                    <td colSpan={3} className="text-right">Đã thu trước</td>
                                    <td className="text-right"><span>{totalBefore.toLocaleString('en-GB')}đ</span></td>
                                </tr>
                                <tr className="total">
                                    <td colSpan={3} className="text-right">Thanh toán</td>
                                    <td className="text-right"><span>{totalPayment.toLocaleString('en-GB')}đ</span></td>
                                </tr>
                                <tr>
                                    <td colSpan={3} className="text-right">Công nợ còn lại</td>
                                    <td className="text-right"><span>{(total - totalPayment - totalBefore).toLocaleString('en-GB')}đ</span></td>
                                </tr>
                            </tbody>
                        </table>

                        {/* <div className="total">
                            PHÍ THU <strong>1.000.000 VNĐ</strong>
                        </div> */}

                        <div className="footer">
                            Thu ngân: <strong>{cashier.name}</strong> - Thời gian: <strong>{new Date(createAt).toLocaleDateString('en-GB')} - {new Date(createAt).toLocaleTimeString('en-GB')}</strong> <br />
                            Hotline hỗ trợ: <strong>0908 508 136</strong>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

class ReceiptVoucherPrint extends Component {
    render() {
        return (
            <Fragment>
                <ReactToPrint
                    trigger={() => <div>{this.props.children}</div>}
                    content={() => this.componentRef}
                />
                <div style={{ display: 'none' }}>
                    <ComponentToPrint detail={this.props.detail} ref={el => (this.componentRef = el)} />
                </div>
            </Fragment>
        );
    }
}

export default ReceiptVoucherPrint;