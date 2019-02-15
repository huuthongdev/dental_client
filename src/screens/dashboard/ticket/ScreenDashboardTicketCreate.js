import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import Select from 'react-select';
import { ScreenDashboardWraper, CpnSvg, SubmitButtonsGroup, TicketService, CpnFetchingData } from '../../../refs';

class ScreenDashboardTicketCreate extends Component {
    state = {
        goBack: false,
        items: [],
        redirectToDetail: null
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

    removeServiceInList(serviceId) {
        const { items } = this.state;
        return this.setState({ items: items.filter(v => v.service._id !== serviceId) });
    }

    render() {
        const { goBack, items, redirectToDetail } = this.state;
        const { match, client, employee, service, fetchDataStatus } = this.props;
        const { idClient } = match.params;

        const checkClient = client.find(v => v._id === idClient);

        if (goBack) return <Redirect to="/client/ticket" />
        if (redirectToDetail) return <Redirect to={`/client/ticket/${redirectToDetail}`} />

        const totalPrice = items.length !== 0 ? items.map(v => v = v.service.suggestedRetailerPrice * v.qty).reduce((a, b) => a + b) : 0;
        if (!fetchDataStatus.client) return <ScreenDashboardWraper> <CpnFetchingData /> </ScreenDashboardWraper>

        return (
            <ScreenDashboardWraper title="Tạo phiếu điều trị">
                <div className="container-fluid">
                    <div className="cpn-form">
                        <div className="container-fluid mb-1">
                            <div className="row align-items-center">
                                <div className="col-sm-8">
                                    <div className="cpn-form-title">
                                        <CpnSvg name="TICKET" />
                                        Thêm mới phiếu điều trị
                            </div>
                                </div>
                                <div className="col-sm-4 text-right">
                                    <button onClick={() => this.props.history.goBack()} className="cpn-form-close">
                                        <CpnSvg name="CLOSE_FORM" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <Formik
                            initialValues={{
                                dentistId: '',
                                clientId: checkClient ? checkClient._id : '',
                                serviceSelect: '',
                            }}
                            validationSchema={Yup.object().shape({
                                dentistId: Yup.string().required('không được để trống'),
                                clientId: Yup.string().required('không được để trống')
                            })}
                            onSubmit={(values, { setSubmitting }) => {
                                const { dentistId, clientId } = values;
                                const payload = { dentistId, clientId, items: items.map(v => v = { service: v.service._id, qty: +v.qty }) };
                                TicketService.create(payload)
                                    .then(success => {
                                        if (success) return this.setState({ redirectToDetail: success._id });
                                        setSubmitting(false);
                                        this.setState({ goBack: true });
                                    });
                            }}
                            render={props => {
                                const { isSubmitting, isValid, errors, touched, setValues, values, setTouched } = props;

                                const dentistArr = employee.filter(v => {
                                    const currentBranchId = localStorage.getItem("BRANCH");
                                    return v.roleInBranchs && v.roleInBranchs.find(v => v.branch._id === currentBranchId
                                        && (v.roles.includes('DENTIST')
                                            || v.roles.includes('DENTISTS_MANAGER')))
                                });

                                const servicesAvailable = service.filter(v => !items.find(k => k.service._id === v._id));

                                return <Form>
                                    <div className="container-fluid">
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className={`form-group required ${errors.clientId && touched.clientId ? 'error' : ''}`}>
                                                    <label>Khách hàng:</label><span className="error-message">{errors.clientId}</span>
                                                    <Select
                                                        defaultValue={checkClient ? { label: `${checkClient.name} - ${checkClient.phone} - ${checkClient.city}`, value: checkClient._id } : null}
                                                        options={client.map(v => v = { label: `${v.name} - ${v.phone} - ${v.city}`, value: v._id })}
                                                        className="select"
                                                        classNamePrefix="react-select"
                                                        onChange={selected => setValues({ ...values, clientId: selected.value })}
                                                        isSearchable
                                                        onBlur={() => setTouched({ ...touched, clientId: true })}
                                                        isDisabled={checkClient}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className={`form-group required ${errors.dentistId && touched.dentistId ? 'error' : ''}`}>
                                                    <label>Bác sĩ phụ trách chính:</label><span className="error-message">{errors.dentistId}</span>
                                                    <Select
                                                        options={dentistArr.map(v => v = { label: `BS: ${v.name}`, value: v._id })}
                                                        className="select"
                                                        classNamePrefix="react-select"
                                                        onChange={selected => setValues({ ...values, dentistId: selected.value })}
                                                        isSearchable
                                                        onBlur={() => setTouched({ ...touched, dentistId: true })}
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
                                                                    <th>Chi phí</th>
                                                                    <th></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {items.map((value, key) => {
                                                                    return <tr key={key}>
                                                                        <td style={{ width: '40px' }}>{key + 1}</td>
                                                                        <td>{value.service.name}</td>
                                                                        <td>{(value.service.suggestedRetailerPrice).toLocaleString('en-GB')}/{value.service.unit}</td>
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
                                                                            {(value.service.suggestedRetailerPrice * value.qty).toLocaleString('en-GB')}đ
                                                                    </td>
                                                                        <td style={{ width: '50px' }}>
                                                                            <div onClick={() => this.removeServiceInList(value.service._id)} className="btn-remove">
                                                                                <CpnSvg name="REMOVE" />
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                })}
                                                                <tr>
                                                                    <td colSpan={6} className="total-row">
                                                                        Tổng cộng: <span className="number">{totalPrice.toLocaleString('en-GB')}</span>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-sm-12">
                                                <SubmitButtonsGroup disabled={!isValid || items.length === 0} loading={isSubmitting} />
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                            }}
                        />
                    </div>
                </div>
            </ScreenDashboardWraper>
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
export default connect(mapStateToProps)(ScreenDashboardTicketCreate);