import React, { Component, Fragment } from 'react';
import { CpnTitle } from '../refs';

class ScreenWraper extends Component {
    render() {
        return (
            <Fragment>
                <div className="screen-wraper">
                    <CpnTitle title={this.props.title} />
                    {this.props.children}
                </div>
            </Fragment>
        );
    }
}

export default ScreenWraper;