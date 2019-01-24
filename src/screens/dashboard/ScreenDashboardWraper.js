import React, { Component, Fragment } from 'react';
import { ScreenDashboardHeader, ScreenDashboardSidebar, CpnAlert, Confirm, MainService, CpnTitle } from '../../refs';
import { connect } from 'react-redux';
import { effect } from '../../assets/js/effect';

class ScreenDashboardWraper extends Component {
    componentDidMount() {
        effect();
        // Init data
        MainService.initData();
        // Fetch Temp Related
        this.fetchTempId = setInterval(() => {
            MainService.setTemp();
        }, 60 * 60 * 1000);
    }

    componentWillUnmount() {
        clearInterval(this.fetchTempId);
    }

    render() {
        const { title } = this.props;
        return (
            <Fragment>
                <ScreenDashboardHeader />
                <ScreenDashboardSidebar />
                <CpnAlert />
                <Confirm />
                {title ? <CpnTitle title={this.props.title} /> : null}

                <div className="components-wraper">
                    {this.props.children}
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        fetchDataStatus: state.fetchDataStatus,
        user: state.user,
    };
}
export default connect(mapStateToProps)(ScreenDashboardWraper);