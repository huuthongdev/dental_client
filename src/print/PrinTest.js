import React, { Component, Fragment } from 'react';
import { CpnSvg } from '../refs';
import './ReceiptVoucherPrint.scss';

class PrinTest extends Component {
    render() {
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
                        <table>
                            <tbody>
                                <tr>
                                    <td>Tên khách hàng: <span>Nguyễn Đức Việt</span></td>
                                </tr>
                                <tr>
                                    <td>Số điện thoại: <span>0908 508 136</span></td>
                                </tr>
                                <tr>
                                    <td>Địa chỉ: <span>76/6 Trần Bá Giao - Phường 6 - Quận Gò Vấp - HCM</span></td>
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
                                <tr>
                                    <td><span>Điều trị tuỷ</span></td>
                                    <td><span>x1 (lần)</span></td>
                                    <td className="text-right"><span>100.000đ</span></td>
                                    <td className="text-right"><span>100.000đ</span></td>
                                </tr>
                                <tr>
                                    <td><span>Điều trị tuỷ</span></td>
                                    <td><span>x1 (lần)</span></td>
                                    <td className="text-right"><span>100.000đ</span></td>
                                    <td className="text-right"><span>100.000đ</span></td>
                                </tr>
                                <tr>
                                    <td><span>Điều trị tuỷ</span></td>
                                    <td><span>x1 (lần)</span></td>
                                    <td className="text-right"><span>100.000đ</span></td>
                                    <td className="text-right"><span>100.000đ</span></td>
                                </tr>
                                
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td className="text-right">Tổng cộng</td>
                                    <td className="text-right"><span>300.000đ</span></td>
                                </tr>
                                <tr className="dashed-bottom">
                                    <td></td>
                                    <td></td>
                                    <td className="text-right">Giảm giá</td>
                                    <td className="text-right"><span>-30.000đ</span></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td className="text-right">Phí thu</td>
                                    <td className="text-right"><span>300.000đ</span></td>
                                </tr>
                                <tr className="total">
                                    <td></td>
                                    <td></td>
                                    <td className="text-right">Công nợ còn lại</td>
                                    <td className="text-right"><span>0.000đ</span></td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="total">
                            PHÍ THU <strong>1.000.000 VNĐ</strong>
                        </div>

                        <div className="footer">
                            Thu ngân: <strong>Phan Tuyết Như</strong> - Thời gian: <strong>10/11/2019 - 10:30:12</strong> <br />
                            Hotline hỗ trợ: <strong>0908 508 136</strong>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default PrinTest;