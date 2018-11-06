import React, { Component, Fragment } from 'react';
import { Svg, removeAlert } from '../../refs';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class AlertItem extends Component {

    removeAlertItem(_id) {
        const { dispatch } = this.props;
        dispatch(removeAlert(_id));
    }

    render() {
        const { item } = this.props;
        return (
            <Fragment>
                <ReactCSSTransitionGroup
                    transitionName="alert-animate"
                    transitionAppear={true}
                    transitionAppearTimeout={100} 
                    transitionEnter={false}
                    transitionLeave={false}
                    >
                    <li className={`${item.type.toLowerCase()}`}>
                        <Svg name={`ALERT_${item.type.toUpperCase()}`} />
                        <p>{item.type === 'ERROR' ? 'Lỗi:' : null}{item.message}</p>
                        <span onClick={() => this.removeAlertItem(item._id)}><Svg name="REMOVE" /></span>
                    </li>
                </ReactCSSTransitionGroup>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        alert: state.alert
    };
}
export default connect(mapStateToProps, null)(AlertItem);