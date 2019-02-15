import React, { Component, Fragment } from 'react';
import { GetRoleName, CpnSvg, SubmitButtonsGroup, convertToSave, Roles, Role, UserService } from '../../../../refs';
import { Form, Formik } from 'formik';
import Select from 'react-select';

class ScreenDashboardEmployeeDetailRoles extends Component {
    render() {
        const { roleInBranchs, _id } = this.props.item;
        const currentBranch = localStorage.getItem("BRANCH");
        const rolesInCurrentBranch = roleInBranchs.find(v => v.branch._id === currentBranch);

        return (
            <Fragment>
                <div className="col-sm-12">
                    <div className="cpn-form">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-sm-12">
                                    <Formik
                                        initialValues={{
                                            roles: convertToSave(rolesInCurrentBranch, rolesInCurrentBranch.roles, [])
                                        }}
                                        onSubmit={(values, { setSubmitting }) => {
                                            const { roles } = values;
                                            UserService.setRoleInBranch(_id, currentBranch, roles)
                                                .then(() => setSubmitting(false));
                                        }}
                                        render={props => {
                                            const { isSubmitting, values, setFieldValue, dirty } = props;
                                            const rolesAvailable = Roles.filter(v => !values.roles.find(k => k === v) && v !== Role.ADMIN);

                                            return <Form>
                                                <div className={`form-group`}>
                                                    <label>Vai trò:</label>
                                                    <Select
                                                        value={null}
                                                        options={rolesAvailable.map(v => v = { label: '+ ' + GetRoleName(v), value: v })}
                                                        className="select"
                                                        classNamePrefix="react-select"
                                                        onChange={selected => {
                                                            setFieldValue('roles', [...values.roles, selected.value]);
                                                        }}
                                                        isSearchable
                                                        placeholder="+ Chọn vai trò thêm vào"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <div className="form-table">
                                                        <table>
                                                            <thead>
                                                                <tr>
                                                                    <th>#</th>
                                                                    <th>Tên vai trò</th>
                                                                    <th></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {values.roles.map((value, key) => {
                                                                    return <Fragment key={key}>
                                                                        <tr>
                                                                            <td style={{ width: '40px' }}>{key + 1}</td>
                                                                            <td>{GetRoleName(value)}</td>
                                                                            <td onClick={() => setFieldValue('roles', values.roles.filter(v => v !== value))} style={{ width: '50px' }}>
                                                                                <div className="btn-remove">
                                                                                    <CpnSvg name="REMOVE" />
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    </Fragment>
                                                                })}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-12 text-center">
                                                        <SubmitButtonsGroup loading={isSubmitting} disabled={!values.roles || values.roles.length === 0 || !dirty} label="Cập nhật" />
                                                    </div>
                                                </div>
                                            </Form>
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default ScreenDashboardEmployeeDetailRoles;