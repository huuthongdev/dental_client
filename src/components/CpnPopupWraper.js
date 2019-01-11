import React, { Component, Fragment } from 'react';

class CpnPopupWraper extends Component {
    render() {
        const { goBack, id } = this.props;
        return (
            <Fragment>
                <div className="cpn-popup-wraper" id={id ? id : ''}>
                    <div className="filter" onClick={() => goBack ? goBack() : false}></div>
                    <div className="body">
                        {this.props.children}
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default CpnPopupWraper;