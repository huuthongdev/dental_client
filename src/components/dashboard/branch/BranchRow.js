import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Svg, onConfirmRemove } from '../../../refs';

class BranchRow extends Component {
    state = {
        onRemove: false,
        onDetail: false
    }

    onDetail() {
        return this.setState({ onDetail: true });
    }

    handleRemove() {
        console.log('On Remove');
    }

    onRemove() {
        const { dispatch } = this.props;
        const { item } = this.props;
        dispatch(onConfirmRemove(item.name, 'Xoá chi nhánh có thể ảnh hưởng đến dữ liệu của chi nhánh bao gồm: Nhân sự, Khách hàng, Phiếu điều trị, KPI', 'chi nhánh', () => this.handleRemove()))
    }

    render() {
        const { item } = this.props;
        const { onDetail } = this.state;

        if (onDetail) return <Redirect to={`/branch/${item._id}`} />
        return (
            <Fragment>
                <tr>
                    <td className="sid">
                        <div className="left-row-side" />
                        {item.sid}
                    </td>
                    <td onClick={() => this.onDetail()} className="link"> {item.name} {item.isMaster ? '(Trụ sở)' : ''}</td>
                    <td> {item.address ? item.address : '--'} </td>
                    <td>{item.district ? item.district : '--'}</td>
                    <td>{item.city ? item.city : '--'}</td>
                    <td>{item.phone ? item.phone : '--'}</td>
                    <td className="list-tools">
                        <button className="row-toggle-list-tools">
                            <Svg name="ARROW_DOWN" />
                        </button>

                        { item.isMaster ? null : 
                        <button onClick={() => this.onRemove()} className="row-btn-remove">
                            <Svg name="REMOVE" />
                        </button> }

                        <div className="right-row-side" />
                    </td>
                </tr>
                <tr className="empty">
                </tr>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        branch: state.branch
    };
}
export default connect(mapStateToProps, null)(BranchRow);