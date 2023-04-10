import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import Rodal from 'rodal/lib/rodal';

import 'rodal/lib/rodal.css';
import { ChangePwd } from '../../api/accountApi';

const ProfileForm = ({ user, visible, onVisible }) => {
    const { register, handleSubmit, errors, reset } = useForm();

    const setVisible = () => {
        onVisible()
        reset()
    }

    const onSubmit = async (data) => {
        if (!(data.new_password == data.confirm_password)) {
            return alert("Nhập không đúng password")
        }
        try {
            const response = await ChangePwd(user.id, data.old_password, data.new_password)

            onVisible();
            reset();

        } catch (error) {
            alert(error);
        }
    }

    return (
        <Rodal height={550} width={400} visible={visible} onClose={setVisible} closeMaskOnClick={false}>
            <Form className="input-form a" onSubmit={handleSubmit(onSubmit)}>
                <div className="col-l-9 offset-md-1">
                    <Form.Group controlId="old_password">
                        <Form.Label>Mật khẩu cũ</Form.Label>
                        <Form.Control
                            type="password"
                            name="old_password"
                            placeholder="Nhập mật khẩu cũ"
                            autoComplete="off"
                            ref={register({
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Mật khẩu chứa ít nhất 6 ký tự"
                                }
                            })}
                            className={`${errors.old_password ? 'input-error' : ''}`}
                        />
                        {errors.old_password && (
                            <p className="errorMsg">{errors.old_password.message}</p>
                        )}
                    </Form.Group>
                    <Form.Group controlId="new_password">
                        <Form.Label>Mật khẩu mới</Form.Label>
                        <Form.Control
                            type="password"
                            name="new_password"
                            placeholder="Nhập mật khẩu mới"
                            autoComplete="off"
                            ref={register({
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Mật khẩu chứa ít nhất 6 ký tự"
                                }
                            })}
                            className={`${errors.new_password ? 'input-error' : ''}`}
                        />
                        {errors.new_password && (
                            <p className="errorMsg">{errors.new_password.message}</p>
                        )}
                    </Form.Group>
                    <Form.Group controlId="confirm_password">
                        <Form.Label>Nhập lại</Form.Label>
                        <Form.Control
                            type="password"
                            name="confirm_password"
                            placeholder="Nhập lại"
                            autoComplete="off"
                            ref={register({
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Mật khẩu chứa ít nhất 6 ký tự"
                                }
                            })}
                            className={`${errors.confirm_password ? 'input-error' : ''}`}
                        />
                        {errors.confirm_password && (
                            <p className="errorMsg">{errors.confirm_password.message}</p>
                        )}
                    </Form.Group>
                    <Button variant="primary" type="submit">Đổi</Button>
                </div>
            </Form>
        </Rodal>
    )
}

export default ProfileForm;