import React, { Component, Fragment } from 'react';

class SubmitButtonsGroup extends Component {
    render() {
        const { loading, disabled, label } = this.props;
        return (
            <Fragment>
                {loading ? (
                    <button type="submit" className="btn blue">
                        <div className="loading-icon" />
                    </button>
                ) : null}

                {!loading ? (
                    <Fragment>
                        <button type="submit" className="btn blue" disabled={disabled}>
                            {label ? label : 'Xác nhận'}
                        </button>
                    </Fragment>
                ) : null}
            </Fragment>
        );
    }
}

export default SubmitButtonsGroup;