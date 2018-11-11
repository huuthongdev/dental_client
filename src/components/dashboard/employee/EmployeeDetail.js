import React, { Component, Fragment } from 'react';
import { FadeAnimate, EmployeeUpdate, Svg, TitleApp } from '../../../refs';

class EmployeeDetail extends Component {
    render() {
        const { returnMain, onCreate, item } = this.props;

        return (
            <Fragment>
                <TitleApp sub={`${item.name}`} />
                <FadeAnimate>
                {/* START COMPONENT TITLE */}
                <div className="container-fluid cpn-head">
                    <div className="row">

                        <EmployeeUpdate item={item} />

                        <div className="col">
                            <div className="cpn-tools-list">
                                <button onClick={() => onCreate()} className="btn blue">
                                    <Svg name="CREATE" />
                                    Tạo nhân sự
                                </button>
                                <button onClick={() => returnMain()} className="btn blue">
                                    <Svg name="BACK" />
                                    Trở lại
                                </button>
                            </div>

                            {/* START SUBMENU */}
                            {/* <ul className="cpn-sub-menu">
                                <li onClick={() => this.changeSubMenu('CLIENTS')} className={subMenuActive === 'CLIENTS' ? 'active' : null}>
                                    Khách hàng
                                </li>
                            </ul> */}
                            {/* END SUBMENU */}

                            {/* {!fetchDataStatus ? <FetchingData /> : <Fragment>

                                {subMenuActive === 'EMPLOYEES' && fetchDataStatus ? <BranchDetailEmployees items={employees} /> : null}

                            </Fragment>} */}


                        </div>
                    </div>
                </div>
                {/* END COMPONENT TITLE */}
            </FadeAnimate>
            </Fragment>
        );
    }
}

export default EmployeeDetail;