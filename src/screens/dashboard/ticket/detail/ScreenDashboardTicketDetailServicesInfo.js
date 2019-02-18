import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import { CpnEmptyValue, SubmitButtonsGroup, CpnCurrencyInput, CpnSvg, ScreenDashboardWraper, CpnFetchingData, TicketService } from '../../../../refs';

class ScreenDashboardTicketDetailServicesInfo extends Component {
    state = {
        items: []
    }

    componentWillMount() {
        this.setState({ items: this.props.ticket.items });
    }

    addItem(serviceId) {
        const { items } = this.state;
        const check = items.find(v => v.service === serviceId);
        if (check) return;
        return this.setState({ items: [...items, { service: serviceId, qty: 1 }] });
    }

    changeQty(serviceId, qty) {
        let { items } = this.state;
        items = items.map(v => v.service._id === serviceId ? v = { ...v, qty: qty } : v);
        return this.setState({ items });
    }

    addNote(serviceId, note) {
        let { items } = this.state;
        items = items.map(v => v.service._id === serviceId ? v = { ...v, note } : v);
        return this.setState({ items });
    }

    removeServiceInList(serviceId) {
        const { items } = this.state;
        return this.setState({ items: items.filter(v => v.service._id !== serviceId) });
    }

    render() {
        const { items } = this.state;
        const { employee, service, fetchDataStatus } = this.props;

        const totalPrice = items.length !== 0 ? items.map(v => v = v.service.suggestedRetailerPrice * v.qty).reduce((a, b) => a + b) : 0;
        if (!fetchDataStatus.client) return <Fragment> <CpnFetchingData /> </Fragment>
        return (
            <Fragment>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="cpn-form">
                            <Formik
                                initialValues={{
                                    dentistId: this.props.ticket.dentistResponsible._id,
                                    clientId: this.props.ticket ? this.props.ticket._id : '',
                                    serviceSelect: '',
                                    createAt: this.props.ticket.createAt,
                                    discountAmount: this.props.ticket.discountAmount ? this.props.ticket.discountAmount : 0
                                }} ticketupda
                                validationSchema={Yup.object().shape({
                                    dentistId: Yup.string().required('không được để trống'),
                                    clientId: Yup.string().required('không được để trống')
                                })}
                                onSubmit={(values, { setSubmitting }) => {
                                    TicketService.update(this.props.ticket._id, items, values.dentistId)
                                        .then(() => setSubmitting(false));
                                }}
                                render={props => {
                                    const { isSubmitting, errors, touched, setValues, values, setTouched, setFieldValue } = props;
                                    const dentistArr = employee.filter(v => {
                                        const currentBranchId = localStorage.getItem("BRANCH");
                                        return v.roleInBranchs && v.roleInBranchs.find(v => v.branch._id === currentBranchId
                                            && (v.roles.includes('DENTIST')
                                                || v.roles.includes('DENTISTS_MANAGER')))
                                    });

                                    const servicesAvailable = service.filter(v => !items.find(k => k.service._id === v._id));
                                    const total = totalPrice - values.discountAmount;

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
                                                    <div className={`form-group ${errors.services && touched.services ? 'error' : ''}`}>
                                                        <label>Dịch vụ:</label><span className="error-message">{errors.services}</span>
                                                        <Select
                                                            value={values.serviceSelect ? values.serviceSelect : null}
                                                            options={servicesAvailable.map(v => v = { label: `+ ${v.name}`, value: v })}
                                                            className="select"
                                                            classNamePrefix="react-select"
                                                            onChange={selected => {
                                                                this.addItem(selected.value);
                                                            }}
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
                                                                                            return this.changeQty(value.service._id, 1);
                                                                                        };
                                                                                        if (qty > 0) return this.changeQty(value.service._id, +qty);
                                                                                    }}
                                                                                    type="number"
                                                                                    defaultValue={value.qty}
                                                                                    onBlur={e => {
                                                                                        const qty = e.target.value;
                                                                                        if (qty === '' || +qty <= 0) {
                                                                                            this.removeServiceInList(value.service._id);
                                                                                        };
                                                                                    }}
                                                                                />
                                                                            </td>
                                                                            <td>
                                                                                <input
                                                                                    type="text"
                                                                                    defaultValue={value.note}
                                                                                    onChange={e => {
                                                                                        const note = e.target.value;
                                                                                        return this.addNote(value.service._id, note);
                                                                                    }}
                                                                                />
                                                                            </td>
                                                                            <td>
                                                                                {(value.service.suggestedRetailerPrice * value.qty).toLocaleString('vi-VN')}đ
                                                                        </td>
                                                                            <td style={{ width: '50px' }}>
                                                                                <div onClick={() => this.removeServiceInList(value.service._id)} className="btn-remove">
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
                                                                                style={{
                                                                                    borderRight: 0,
                                                                                    borderLeft: 0,
                                                                                    borderTop: 0,
                                                                                    borderBottom: 0,
                                                                                    borderRadius: 0,
                                                                                    textAlign: 'right',
                                                                                    paddingRight: 0,
                                                                                    paddingTop: '5px'
                                                                                }}
                                                                            />
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td colSpan={5} className="total-row text-right">
                                                                            Tổng tiền:
                                                                    </td>
                                                                        <td colSpan={2} className="total-row text-right">
                                                                            <span className="number">{total.toLocaleString('vi-VN')}đ</span>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-sm-12 text-right">
                                                    <SubmitButtonsGroup label="Cập nhật" disabled={items.length === 0} loading={isSubmitting} />
                                                </div>
                                            </div>
                                        </div>
                                    </Form>
                                }}
                            />
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        client: state.client,
        employee: state.employee,
        service: state.service,
        fetchDataStatus: state.fetchDataStatus
    };
}
export default connect(mapStateToProps)(ScreenDashboardTicketDetailServicesInfo);