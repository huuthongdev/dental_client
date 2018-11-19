import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { ProductUpdate, CpnWraper, FetchingData, TitleApp } from '../../../refs';

class ProductDetail extends Component {
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
                <CpnWraper>
                    <FetchingData />
                </CpnWraper>
            );
        }

        // Find branch in branchs store
        const product = this.props.product.filter(v => v._id === _id)[0];
        if (!product) return <CpnWraper>Không tìm thấy dữ liệu!</CpnWraper>;

        return (
            <Fragment>
                <TitleApp sub={`Chi nhánh ${product.name}`} />
                <ProductUpdate item={product}/>
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
export default connect(mapStateToProps, null)(ProductDetail);