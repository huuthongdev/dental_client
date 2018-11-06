import React, { Component, Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class FadeAnimate extends Component {
    render() {
        return (
            <Fragment>
                <ReactCSSTransitionGroup
                    transitionName="fade-animate"
                    transitionAppear={true}
                    transitionAppearTimeout={300}
                    transitionEnter={false}
                    transitionLeave={false}
                >
                {this.props.children}
                </ReactCSSTransitionGroup>
            </Fragment>
        );
    }
}

export default FadeAnimate;