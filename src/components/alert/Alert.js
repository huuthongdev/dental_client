import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import AlertItem from './AlertItem';

class Alert extends Component {

    showAlertItems() {
        const { alert } = this.props;
        return alert.map((item, i) => <AlertItem item={item} key={i} />);
    }

    render() {
        return (
            <Fragment>
                <ul className="alert-list">
                    {this.showAlertItems()}
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