import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ServiceUpdate, CpnWraper, FetchingData, TitleApp } from '../../../refs';

class ServiceDetail extends Component {
    state = {
        // fetchDataDetailStatus: false,
        // subMenuActive: "INFO",
        // goBack: false
    };

    render() {
        const { _id } = this.props.match.params;
        const { fetchDataStatus } = this.props;

        // Waiting for fetch data store
        if (!fetchDataStatus.service) {
            return (
                <CpnWraper>
                    <FetchingData />
                </CpnWraper>
            );
        }

        // Find branch in branchs store
        const service = this.props.service.filter(v => v._id === _id)[0];
        if (!service) return <CpnWraper>Không tìm thấy dữ liệu!</CpnWraper>;


        return (
            <CpnWraper>
                <TitleApp sub={`Chi nhánh ${service.name}`} />
                <ServiceUpdate item={service} />
            </CpnWraper>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        service: state.service,
        fetchDataStatus: state.fetchDataStatus
    };
}
export default connect(mapStateToProps, null)(ServiceDetail);