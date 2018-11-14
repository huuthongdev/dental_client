import React, { Component, Fragment } from 'react';
import { FadeAnimate } from '../refs';

class CpnWraper extends Component {
    render() {
        return (
            <Fragment>
                <FadeAnimate>
                    <div className="components-wraper">
                        {this.props.children}
                    </div>
                </FadeAnimate>
            </Fragment>
        );
    }
}

export default CpnWraper;