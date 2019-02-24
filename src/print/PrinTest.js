import React, { Component, Fragment } from 'react';
import { CpnSvg } from '../refs';
import './ReceiptVoucherPrint.scss';

class PrinTest extends Component {
    render() {
        const string = '{"_id":"5c70e923fbbdd7072c33140c","sid":8,"type":"FOR_TICKET","client":{"_id":"5c6ca272b5f8cf11492a8d0a","sid":1,"name":"Mittie Ortiz","phone":"(585) 405-4297 x491","email":"huuthong.mgd@gmail.com","address":"217 Nguyễn Thái Sơn, Phường 7","city":"Thành phố Đà Nẵng","district":"Huyện Hoàng Sa"},"branchTransaction":"5c6ca271b5f8cf11492a8cec","cashier":{"_id":"5c6ca271b5f8cf11492a8ceb","sid":1,"name":"admin"},"totalPayment":53144,"content":"","ticket":{"_id":"5c70069a901232133cdb453d","sid":2,"client":"5c6ca272b5f8cf11492a8d0a","receiptVoucher":[{"_id":"5c70e740fbbdd7072c331400","totalPayment":100000,"createAt":1550903104733},{"_id":"5c70e7f1fbbdd7072c331402","totalPayment":90000,"createAt":1550903281207},{"_id":"5c70e875fbbdd7072c331404","totalPayment":81000,"createAt":1550903413767},{"_id":"5c70e89afbbdd7072c331406","totalPayment":72900,"createAt":1550903450392},{"_id":"5c70e8eefbbdd7072c331408","totalPayment":65610,"createAt":1550903534465},{"_id":"5c70e908fbbdd7072c33140a","totalPayment":59049,"createAt":1550903560729},{"_id":"5c70e923fbbdd7072c33140c","totalPayment":53144,"createAt":1550903587316},{"_id":"5c70e937fbbdd7072c33140e","totalPayment":47829,"createAt":1550903607800},{"_id":"5c70e955fbbdd7072c331410","totalPayment":43046,"createAt":1550903637164},{"_id":"5c70e9a7fbbdd7072c331412","totalPayment":38742,"createAt":1550903719674},{"_id":"5c70e9bbfbbdd7072c331414","totalPayment":34868,"createAt":1550903739282},{"_id":"5c70ea46fbbdd7072c331416","totalPayment":31381,"createAt":1550903878471},{"_id":"5c70ebb3fbbdd7072c331418","totalPayment":28243,"createAt":1550904243721},{"_id":"5c70ebc3fbbdd7072c33141a","totalPayment":25418,"createAt":1550904259113},{"_id":"5c70ebe4fbbdd7072c33141c","totalPayment":22877,"createAt":1550904292542},{"_id":"5c70ecf5fbbdd7072c33141e","totalPayment":20589,"createAt":1550904565169},{"_id":"5c70fc818135590fd885e01f","totalPayment":18530,"createAt":1550908545890},{"_id":"5c70fcc8e7a4bd13bbcd63de","totalPayment":16677,"createAt":1550908616188},{"_id":"5c70fdbfe7a4bd13bbcd63e0","totalPayment":15009,"createAt":1550908863464},{"_id":"5c70fe4ee7a4bd13bbcd63e2","totalPayment":1000,"createAt":1550909006209},{"_id":"5c70fe68e7a4bd13bbcd63e4","totalPayment":1000,"createAt":1550909032122},{"_id":"5c70fee8e7a4bd13bbcd63e6","totalPayment":13308,"createAt":1550909160880},{"_id":"5c70fefee7a4bd13bbcd63e8","totalPayment":11978,"createAt":1550909182176},{"_id":"5c70ff5be7a4bd13bbcd63ea","totalPayment":7802,"createAt":1550909275110}],"totalAmount":1000000,"items":[{"service":{"_id":"5c6ca272b5f8cf11492a8cf4","name":"Tiểu Phẫu Răng Khôn, Nạo Cắt Chóp","suggestedRetailerPrice":1000000,"unit":"răng"},"qty":1,"_id":"5c70069a901232133cdb453e"}]},"__v":0,"items":[],"createAt":1550903587316}';
        const detail = JSON.parse(string);
        const { client, ticket, totalPayment, _id, createAt, cashier } = detail;
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
                                {totalBefore && totalBefore !== 0 ? <tr>
                                    <td colSpan={3} className="text-right">Đã thu trước</td>
                                    <td className="text-right"><span>{totalBefore.toLocaleString('en-GB')}đ</span></td>
                                </tr> : null}

                                <tr className="total">
                                    <td colSpan={3} className="text-right">Thanh toán</td>
                                    <td className="text-right"><span>{totalPayment.toLocaleString('en-GB')}đ</span></td>
                                </tr>
                                <tr>
                                    <td colSpan={3} className="text-right">Còn lại</td>
                                    <td className="text-right"><span>{(total - totalPayment - totalBefore).toLocaleString('en-GB')}đ</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="signature">
                        <div className="item">
                            <p>Khách hàng</p>
                            <p><small>(Ký và ghi rõ họ tên)</small></p>
                        </div>
                    </div>

                    <div className="footer">
                        Thu ngân: <strong>{cashier.name}</strong> - Thời gian: <strong>{new Date(createAt).toLocaleDateString('en-GB')} - {new Date(createAt).toLocaleTimeString('en-GB')}</strong> <br />
                        Hotline hỗ trợ: <strong>0908 508 136</strong>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default PrinTest;