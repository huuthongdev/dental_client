import React, { Component } from 'react';
import { ScreenWraper } from '../refs';

class ScreenNotMatch404 extends Component {
    render() {
        return (
            <ScreenWraper title="Không tìm thấy trang yêu cầu">
                Invalid Route
            </ScreenWraper>
        );
    }
}

export default ScreenNotMatch404;