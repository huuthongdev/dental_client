import React, { Component, Fragment } from 'react';

class TitleApp extends Component {
    render() {
        const { sub } = this.props;

        return (
            <Fragment>
                <title>{sub} - Dental Application</title>
            </Fragment>
        );
    }
}

export default TitleApp;