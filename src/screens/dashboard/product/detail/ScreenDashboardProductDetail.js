import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { ScreenDashboardProductDetailUpdate, ScreenDashboardWraper, CpnFetchingData, TitleApp } from '../../../../refs';

class ScreenDashboardProductDetail extends Component {
    state = {
        // fetchDataDetailStatus: false,
        // subMenuActive: "INFO",
        // goBack: false
    };

    render() {
        const { _id } = this.props.match.params;
        const { fetchDataStatus } = this.props;

        // Waiting for fetch data store
        if (!fetchDataStatus.product) {
            return (
                <ScreenDashboardWraper>
                    <CpnFetchingData />
                </ScreenDashboardWraper>
            );
        }

        // Find branch in branchs store
        const product = this.props.product.filter(v => v._id === _id)[0];
        if (!product) return <ScreenDashboardWraper><TitleApp sub={`Không tìm thấy dữ liệu!`} /> Không tìm thấy dữ liệu!</ScreenDashboardWraper>;

        return (
            <Fragment>
                <TitleApp sub={`${product.name}`} />
                <ScreenDashboardProductDetailUpdate item={product}/>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        product: state.product,
        fetchDataStatus: state.fetchDataStatus
    };
}
export default connect(mapStateToProps)(ScreenDashboardProductDetail);