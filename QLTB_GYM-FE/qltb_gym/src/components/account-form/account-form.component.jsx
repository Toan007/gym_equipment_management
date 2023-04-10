import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

import Rodal from 'rodal/lib/rodal';

import { addSupplier } from '../../redux/supplier/supplier.actions';

import 'rodal/lib/rodal.css';
import { CreateAccount } from '../../api/accountApi';

const AccountForm = ({ visible, onVisible, user, setAccount, accounts, setLoadData }) => {
    const { register, handleSubmit, errors, reset } = useForm();
    const roleOptions = [{id:"1",roleName:"Admin"}, {id:"2", roleName:"Staff"}];
    const [roleId, setRoleId] = useState(roleOptions[0]);
    const onSubmit = async (data) => {

        console.log(data)
        try {
            const response = await CreateAccount(data.username, data.roleId, data.birthDate, data.firstName, data.lastName, data.idCode)
            setAccount([...accounts, data])


            onVisible();
            reset();
            setLoadData(value => ++value)
        } catch (error) {
            alert(error);
        }
    };

    return (
        <Rodal height={700} width={500} visible={visible} onClose={onVisible} closeMaskOnClick={false}>
            <Form className="input-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="col-l-9 offset-md-1">
                    <Form.Group controlId="firstName">
                        <Form.Label>Họ nhân viên</Form.Label>
                        <Form.Control
                            type="text"
                            name="firstName"
                            placeholder="Nhập họ nhân viên"
                            autoComplete="off"
                            ref={register({
                                required: 'Name is required.',
                                pattern: {
                                    value: /^[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ\s]+$/,
                                    message: 'Họ nhân viên chỉ chứa các ký tự chữ.'
                                }
                            })}
                            className={`${errors.firstName ? 'input-error' : ''}`}
                        />
                        {errors.name && (
                            <p className="errorMsg">{errors.firstName.message}</p>
                        )}
                    </Form.Group>
                    <Form.Group controlId="lastName">
                        <Form.Label>Tên nhân viên</Form.Label>
                        <Form.Control
                            type="text"
                            name="lastName"
                            placeholder="Nhập tên nhân viên"
                            autoComplete="off"
                            ref={register({
                                required: 'Name is required.',
                                pattern: {
                                    value: /^[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ\s]+$/,
                                    message: 'Tên nhân viên chỉ chứa các ký tự chữ.'
                                }
                            })}
                            className={`${errors.lastName ? 'input-error' : ''}`}
                        />
                        {errors.name && (
                            <p className="errorMsg">{errors.lastName.message}</p>
                        )}
                    </Form.Group>

                    <Form.Group controlId="idCode">
                        <Form.Label>CMND</Form.Label>
                        <Form.Control
                            type="text"
                            name="idCode"
                            placeholder="Nhập CMND"
                            autoComplete="off"
                            ref={register({
                                required: 'Id number is required.',
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: 'CMND không bao gồm ký tự chữ.'
                                },
                                maxLength: {
                                    value: 12,
                                    message: "CMND chứa nhiều nhất 12 số"
                                }
                            })}
                            className={`${errors.idCode ? 'input-error' : ''}`}
                        />
                        {errors.tax_num && (
                            <p className="errorMsg">{errors.idCode.message}</p>
                        )}
                    </Form.Group>
                    <Form.Group controlId="birthDate">
                        <Form.Label>Ngày sinh</Form.Label>
                        <Form.Control
                            type="date"
                            name="birthDate"
                            autoComplete="off"
                            ref={register()}
                            className={`${errors.birthDate ? 'input-error' : ''}`}
                        />
                        {errors.address && (
                            <p className="errorMsg">{errors.birthDate.message}</p>
                        )}
                    </Form.Group>
                    <Form.Group controlId="username">
                        <Form.Label>Tên đăng nhập</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            placeholder="Nhập tên đăng nhập"
                            autoComplete="off"
                            ref={register({
                                required: 'Name is required.',
                                pattern: {
                                    value: /^[0-9a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ\s]+$/,
                                    message: 'Họ nhân viên chỉ chứa các ký tự chữ và số.'
                                }
                            })}
                            className={`${errors.username ? 'input-error' : ''}`}
                        />
                        {errors.name && (
                            <p className="errorMsg">{errors.username.message}</p>
                        )}
                    </Form.Group>
                    <Form.Group controlId="roleId">
                        <Form.Label>Quyền</Form.Label>
                        <Form.Control as="select" name="roleId" value={roleId} onChange={(event) => setRoleId(event.target.value)} ref={register()}>
                            {roleOptions.map(role =>
                                <option value={role.id}>{role.roleName}</option>
                            )}
                        </Form.Control>
                    </Form.Group>
                    <Button variant="primary" type="submit">Thêm</Button>
                </div>
            </Form>
        </Rodal>
    )
}

const mapStateToProps = ({ user }) => ({
    user: user.currentUser
})

const mapDispatchToProps = dispatch => ({
    addSupplier: supplier => dispatch(addSupplier(supplier))
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountForm);