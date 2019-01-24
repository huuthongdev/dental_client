import React, { Component, Fragment } from 'react';

class CpnEmptyValue extends Component {
    render() {
        const { message } = this.props;

        return (
            <Fragment>
                <div className="cpn-empty-value">
                    {message ? message : 'Không có kết quả nào'}
                </div>
            </Fragment>
        );
    }
}

export default CpnEmptyValue;