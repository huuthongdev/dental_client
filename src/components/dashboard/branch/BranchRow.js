import React, { Component, Fragment } from 'react';
import { Svg } from '../../../refs';

class BranchRow extends Component {
    state = {
        onRemove: false
    }

    componentDidMount() {
        // // TODO: Test
        // const { item, onDetail } = this.props;
        // onDetail(item);
    }

    render() {
        const { item, onDetail, onRemove } = this.props;
        return (
            <Fragment>
                <tr>
                    <td className="sid">
                        <div className="left-row-side" />
                        {item.sid}
                    </td>
                    <td onClick={() => onDetail()} className="link"> {item.name} {item.isMaster ? '(Trụ sở)' : ''}</td>
                    <td> {item.address ? item.address : '--'} </td>
                    <td>{item.district ? item.district : '--'}</td>
                    <td>{item.city ? item.city : '--'}</td>
                    <td>{item.phone ? item.phone : '--'}</td>
                    <td className="list-tools">
                        <button className="row-toggle-list-tools">
                            <Svg name="ARROW_DOWN" />
                        </button>

                        { item.isMaster ? null : 
                        <button onClick={() => onRemove()} className="row-btn-remove">
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

export default BranchRow;