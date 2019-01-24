import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScreenDashboardServiceDetailUpdate, ScreenDashboardWraper, CpnFetchingData, TitleApp } from '../../../../refs';

class ScreenDashboardServiceDetail extends Component {
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
                <ScreenDashboardWraper>
                    <CpnFetchingData />
                </ScreenDashboardWraper>
            );
        }

        // Find branch in branchs store
        const service = this.props.service.filter(v => v._id === _id)[0];
        if (!service) return <ScreenDashboardWraper>Không tìm thấy dữ liệu!</ScreenDashboardWraper>;


        return (
            <ScreenDashboardWraper>
                <TitleApp sub={`Chi nhánh ${service.name}`} />
                <ScreenDashboardServiceDetailUpdate item={service} />
            </ScreenDashboardWraper>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        service: state.service,
        fetchDataStatus: state.fetchDataStatus
    };
}
export default connect(mapStateToProps)(ScreenDashboardServiceDetail);