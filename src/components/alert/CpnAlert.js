import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { CpnAlertItem } from '../../refs';

class CpnAlert extends Component {
    render() {
        const { alert } = this.props;
        return (
            <Fragment>
                <ul className="alert-list">
                    {alert.map((item, i) => <CpnAlertItem item={item} key={i} />)}
                </ul>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        alert: state.alert
    };
}
export default connect(mapStateToProps)(CpnAlert);