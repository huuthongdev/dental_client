import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import DatePicker from "react-datepicker";
import Select from 'react-select';
import ScreenClientDetailWraper from './ScreenClientDetailWraper';
import { SubmitButtonsGroup, CpnCurrencyInput, CpnSvg, formMessage, CpnEmptyValue, TicketService } from '../../../../refs';

class ScreenClientDetailTicketDetail extends Component {
    render() {
        return (
            <ScreenClientDetailWraper
                subBox
                title="• Chi tiết phiếu điều trị"
                render={mainProps => {
                    const { client, match } = mainProps;
                    const { ticketId } = match.params;
                    const ticket = client.tickets.find(v => v._id === ticketId);

                    if (!ticket) return <CpnEmptyValue message="Không tìm thấy phiếu điều trị!" />
                    // console.log(ticket);
                    return <Fragment>
                        <div className="cpn-form" style={{ padding: '15px 5px' }}>
                            <Formik
                                className="cpn-form"
                                initialValues={{
                                    dentistId: ticket.dentistResponsible._id,
                                    clientId: client._id,
                                    createAt: ticket.createAt,
                                    discountAmount: ticket.discountAmount,
                                    items: ticket.items
                                }}
                                validationSchema={Yup.object().shape({
                                    dentistId: Yup.string().required(formMessage.required),
                                    clientId: Yup.string().required(formMessage.required),
                                    items: Yup.array().required(formMessage.required)
                                })}
                                onSubmit={(values, { setSubmitting }) => {
                                    const { dentistId, createAt, discountAmount, items } = values;
                                    TicketService.update(ticket._id, dentistId, items, createAt, discountAmount)
                                        .then(() => {
                                            setSubmitting(false);
                                        });
                                }}
                                render={props => {
                                    const { isSubmitting, errors, touched, setValues, values, setTouched, setFieldValue, dirty } = props;
                                    const { employee, service } = this.props;
                                    let { items } = values;
                                    const dentistArr = employee.filter(v => {
                                        const currentBranchId = localStorage.getItem("BRANCH");
                                        return v.roleInBranchs && v.roleInBranchs.find(v => v.branch._id === currentBranchId
                                            && (v.roles.includes('DENTIST')
                                                || v.roles.includes('DENTISTS_MANAGER')))
                                    });

                                    const servicesAvailable = service.filter(v => !items.find(k => k.service._id === v._id));
                                    const totalPrice = items.length !== 0 ? items.map(v => v = v.service.suggestedRetailerPrice * v.qty).reduce((a, b) => a + b) : 0;
                                    const total = totalPrice - values.discountAmount;

                                    const addItem = (serviceId) => {
                                        const check = items.find(v => v.service === serviceId);
                                        if (check) return;
                                        return setFieldValue('items', [...items, { service: serviceId, qty: 1 }]);
                                    }

                                    const changeQty = (serviceId, qty) => {
                                        items = items.map(v => v.service._id === serviceId ? v = { ...v, qty: qty } : v);
                                        return setFieldValue('items', items);
                                    }

                                    const addNote = (serviceId, note) => {
                                        items = items.map(v => v.service._id === serviceId ? v = { ...v, note } : v);
                                        return setFieldValue('items', items);
                                    }

                                    const removeServiceInList = (serviceId) => {
                                        return setFieldValue('items', items.filter(v => v.service._id !== serviceId));
                                    }

                                    return <Form>
                                        <div className="container-fluid">
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <div className={`form-group required ${errors.dentistId && touched.dentistId ? 'error' : ''}`}>
                                                        <label>Bác sĩ phụ trách chính:</label><span className="error-message">{errors.dentistId}</span>
                                                        <Select
                                                            defaultValue={dentistArr.map(v => v = { label: `BS: ${v.name}`, value: v._id }).find(v => v.value === values.dentistId)}
                                                            options={dentistArr.map(v => v = { label: `BS: ${v.name}`, value: v._id })}
                                                            className="select"
                                                            classNamePrefix="react-select"
                                                            onChange={selected => setValues({ ...values, dentistId: selected.value })}
                                                            isSearchable
                                                            onBlur={() => setTouched({ ...touched, dentistId: true })}
                                                            placeholder="- Chọn -"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className={`form-group ${errors.createAt && touched.createAt ? 'error' : ''}`}>
                                                        <label>Ngày bắt đầu điều trị:</label><span className="error-message">{errors.createAt}</span>
                                                        <DatePicker
                                                            selected={values.createAt ? new Date(values.createAt) : null}
                                                            onChange={(date) => setFieldValue('createAt', date ? new Date(date).getTime() : '')}
                                                            onBlur={() => setTouched({ ...touched, createAt: true })}
                                                            dateFormat="dd/MM/yyyy"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-sm-12">
                                                    <div className={`form-group ${errors.items && touched.items ? 'error' : ''}`}>
                                                        <label>Dịch vụ:</label><span className="error-message">{errors.items}</span>
                                                        <Select
                                                            value={null}
                                                            options={servicesAvailable.map(v => v = { label: `+ ${v.name}`, value: v })}
                                                            className="select"
                                                            classNamePrefix="react-select"
                                                            onChange={selected => addItem(selected.value)}
                                                            isSearchable
                                                            placeholder="+ Chọn dịch vụ thêm vào"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-sm-12">
                                                    <div className="form-group">
                                                        <div className="form-table">
                                                            <table>
                                                                <thead>
                                                                    <tr>
                                                                        <th>#</th>
                                                                        <th>Dịch vụ</th>
                                                                        <th>Đơn giá</th>
                                                                        <th>Số lượng</th>
                                                                        <th>Ghi chú</th>
                                                                        <th style={{ width: '130px' }}>Chi phí</th>
                                                                        <th></th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {items.map((value, key) => {
                                                                        return <tr key={key}>
                                                                            <td style={{ width: '40px' }}>{key + 1}</td>
                                                                            <td>{value.service.name}</td>
                                                                            <td>{(value.service.suggestedRetailerPrice).toLocaleString('vi-VN')}/{value.service.unit}</td>
                                                                            <td className="qty-col">
                                                                                <input
                                                                                    onChange={e => {
                                                                                        const qty = e.target.value;
                                                                                        if (qty !== '' && +qty <= 0) {
                                                                                            e.target.value = 1;
                                                                                            return changeQty(value.service._id, 1);
                                                                                        };
                                                                                        if (qty > 0) return changeQty(value.service._id, +qty);
                                                                                    }}
                                                                                    type="number"
                                                                                    defaultValue={value.qty}
                                                                                    onBlur={e => {
                                                                                        const qty = e.target.value;
                                                                                        if (qty === '' || +qty <= 0) {
                                                                                            removeServiceInList(value.service._id);
                                                                                        };
                                                                                    }}
                                                                                />
                                                                            </td>
                                                                            <td>
                                                                                <input type="text" onChange={e => addNote(value.service._id, e.target.value)}
                                                                                />
                                                                            </td>
                                                                            <td>
                                                                                {(value.service.suggestedRetailerPrice * value.qty).toLocaleString('vi-VN')}đ
                                                                        </td>
                                                                            <td style={{ width: '50px' }}>
                                                                                <div onClick={() => removeServiceInList(value.service._id)} className="btn-remove">
                                                                                    <CpnSvg name="REMOVE" />
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    })}
                                                                    <tr>
                                                                        <td colSpan={5} className="total-row text-right">
                                                                            Tạm tính:
                                                                    </td>
                                                                        <td colSpan={2} className="total-row text-right">
                                                                            {totalPrice.toLocaleString('vi-VN')}đ
                                                                    </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td colSpan={5} className="total-row text-right">
                                                                            Giảm giá:
                                                                    </td>
                                                                        <td colSpan={2} className="total-row text-right" style={{ paddingTop: 0, paddingBottom: 0 }}>
                                                                            <CpnCurrencyInput
                                                                                showNull
                                                                                subfix="đ"
                                                                                value={values.discountAmount}
                                                                                onChange={e => setFieldValue('discountAmount', e)}
                                                                            />
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td colSpan={5} className="total-row text-right">
                                                                            Tổng tiền:
                                                                        </td>
                                                                        <td colSpan={2} className="total-row text-right">
                                                                            <CpnCurrencyInput
                                                                                showNull
                                                                                subfix="đ"
                                                                                value={total}
                                                                                className="number"
                                                                                onChange={e => setFieldValue('discountAmount', +totalPrice - +e)}
                                                                            />
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-sm-12 text-center">
                                                    <SubmitButtonsGroup label="Cập nhật" loading={isSubmitting} disabled={!dirty} />
                                                </div>
                                            </div>
                                        </div>
                                    </Form>
                                }}
                            />
                        </div>
                    </Fragment>
                }}
            >
            </ScreenClientDetailWraper>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        employee: state.employee,
        service: state.service
    };
}
export default connect(mapStateToProps)(ScreenClientDetailTicketDetail);