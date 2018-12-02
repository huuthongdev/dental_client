import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import AlertItem from './AlertItem';

class Alert extends Component {
    render() {
        const { alert } = this.props;
        return (
            <Fragment>
                <ul className="alert-list">
                    {alert.map((item, i) => <AlertItem item={item} key={i} />)}
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
export default connect(mapStateToProps, null)(Alert);