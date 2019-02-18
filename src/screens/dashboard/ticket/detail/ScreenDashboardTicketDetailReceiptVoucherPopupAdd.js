import React, { Component } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { CpnPopupWraper, CpnSvg, SubmitButtonsGroup, TicketService, convertToSave, ShortKeyService, CpnCurrencyInput } from '../../../../refs';

class ScreenDashboardTicketDetailReceiptVoucherPopupAdd extends Component {
    componentDidMount() {
        ShortKeyService.esc(() => this.props.goBack());
    }
 
    render() {
        const { debitAmount, clientId, ticketId } = this.props;
        return (
            <CpnPopupWraper {...this.props} id="screen-dashboard-detail-receipt-voucher-popup-add">
                <div className="cpn-form">
                    <div className="cpn-popup-title mb-1">
                        <div className="container-fluid">
                            <div className="row align-items-center">
                                <div className="col-sm-8">
                                    <div className="cpn-form-title">
                                        <CpnSvg name="MONEY_CHECK" />
                                        Thu phí
                                </div>
                                </div>
                                <div className="col-sm-4 text-right">
                                    <button onClick={() => this.props.goBack()} className="cpn-form-close">
                                        <CpnSvg name="CLOSE_FORM" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Formik
                        initialValues={{
                            totalPayment: convertToSave(debitAmount),
                            content: ''
                        }}
                        validationSchema={Yup.object().shape({
                            totalPayment: Yup.number().required('Cần nhập số tiền').min(1000, 'Phí thu ít nhất 1,000 đồng').max(debitAmount, 'Vượt giới hạn thu')
                        })}
                        onSubmit={(values, { setSubmitting }) => {
                            const payload = { ...values, clientId, ticketId };
                            TicketService.payment(payload, clientId)
                                .then(success => { 
                                    setSubmitting(false);
                                    if (success) this.props.goBack();
                                });
                        }}
                        render={props => {
                            const { isSubmitting, errors, touched, values, setFieldValue, setTouched } = props;
                            return <Form>
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className={`form-group required ${errors.totalPayment && touched.totalPayment ? 'error' : ''}`}>
                                                <label>Số tiền:</label><span className="error-message">{errors.totalPayment}</span>
                                                <CpnCurrencyInput
                                                    subfix="đ"
                                                    value={values.totalPayment}
                                                    onChange={e => setFieldValue('totalPayment', e)}
                                                    onBlur={() => setTouched({ ...touched, totalPayment: true })}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-12">
                                            <div className={`form-group ${errors.content && touched.content ? 'error' : ''}`}>
                                                <label>Ghi chú:</label><span className="error-message">{errors.content}</span>
                                                <Field component="textarea" name="content" />
                                            </div>
                                        </div>
                                        <div className="col-sm-12">
                                            <SubmitButtonsGroup loading={isSubmitting} />
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        }}
                    />
                </div>
            </CpnPopupWraper>
        );
    }
}

export default ScreenDashboardTicketDetailReceiptVoucherPopupAdd;