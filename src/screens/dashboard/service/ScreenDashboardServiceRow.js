import React, { Component, Fragment } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { CpnSvg } from '../../../refs';

class ScreenDashboardServiceRow extends Component {
    state = {
        onRemove: false,
        onDetail: false
    };

    formatPriceInCurrentBranch() {
        // TODO:   
        return this.props.item.suggestedRetailerPrice.toLocaleString('en-GB');
    }

    handleRemove() {
        // const { dispatch } = this.props;
        // const { item } = this.props;
    }

    onRemove() {
        // const { dispatch } = this.props;
        // const { item } = this.props;
        // dispatch(
        //     onConfirmRemove(
        //         item.name,
        //         "Xoá dịch vụ có thể ảnh hưởng đến dữ liệu của dịch vụ bao gồm: Chi nhánh, Phiếu điều trị, các dịch vụ liên quan",
        //         "dịch vụ",
        //         () => this.handleRemove()
        //     )
        // );
    }


    render() {
        const { item } = this.props;
        const { onDetail } = this.state;

        if (onDetail) return <Redirect to={`/service/${item._id}`} />;
        return (
            <Fragment>
                <tr>
                    <td className="sid">
                        <div className="left-row-side" />
                        {item.sid}
                    </td>
                    <td onClick={() => this.setState({ onDetail: true })} className="link"> {item.name}</td>
                    <td>{item.suggestedRetailerPrice.toLocaleString('en-GB')}đ</td>
                    <td>{this.formatPriceInCurrentBranch()}</td>
                    <td>{item.unit}</td>
                    <td className="list-tools">
                        <button className="row-toggle-list-tools">
                            <CpnSvg name="ARROW_DOWN" />
                        </button>
                        <div className="right-row-side" />
                    </td>
                </tr>
                <tr className="empty">
                </tr>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        service: state.service
    };
}
export default connect(mapStateToProps)(ScreenDashboardServiceRow);