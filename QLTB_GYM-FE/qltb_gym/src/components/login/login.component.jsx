import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { getUser, LoginApi } from '../../api/accountApi';
import { setCurrentUser } from '../../redux/user/user.actions'; 
import { fetchSuppliers } from '../../redux/supplier/supplier.actions';
import { fetchReceipt } from '../../redux/receipt/receipt.actions';
import Img from "../../assets/Img_account.jpg"
import './login.styles.scss';
import { getAllSuppliers } from '../../api/SuppliersApi';


const Login = ({ setUser, fetchSuppliers, fetchReceipts, history }) => {
    const { register, handleSubmit, errors } = useForm();
    const [userCredentials, setCredentials] = useState(''); 

    const onSubmit = async (data) => {
        try {
            const response = await LoginApi(data.user_name, data.password)
            // console.log(response)
            if (response.userExist == false) {
                alert("Sai tài khoản!")
            }
            else if (response.isValid == false) {
                alert("Tài khoản đã bị vô hiệu hóa!")
            }
            else if (response.password == false) {
                alert("Sai mật khẩu!")
            }
            else {
                const user = await getUser(data.user_name)
                // console.log(user)
                setUser(user);
                localStorage.setItem("user",JSON.stringify(user))

                try {
                    const suppliers = await getAllSuppliers()
                    
                    fetchSuppliers(suppliers)
                    history.push("/manage")
                    console.log('supp',suppliers)
                } catch (error) {
                    console.log(error)
                    
                }
            }
        } catch (error) {
            alert(error);
        }
    }

    return (
        <div className='form'>
            <div className="img_login">
                <img src={Img} style={{width:"100%",height:"100%"}} />
            </div>
            <div className="bg_login">
                <div className='loginInput'>
                    <div className="login" >
                        <Form className="input-form" onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group controlId="user_name">
                                {/* <div className='loginInput'> */}
                                <Form.Label>User name</Form.Label>
                                {/* </div> */}
                                <Form.Control 
                                    type="text"
                                    name="user_name"
                                    placeholder="Enter your user name"
                                    ref={register({
                                        required: "UserName is required",
                                        pattern: {
                                            value: /^[a-zA-Z0-9]+$/,
                                            message: "Tên đăng nhập không hợp lệ"
                                        }
                                    })}
                                    className={`${errors.user_name? 'input-error': ''}`}
                                />
                                {errors.user_name && (
                                    <p className="errorMsg">{errors.user_name.message}</p>
                                )}
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                    type="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    ref={register({
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message: "Mật khẩu chứa ít nhất 6 ký tự"
                                        }
                                    })}
                                    className={`${errors.password? 'input-error': ''}`}
                                />
                                {errors.password && (
                                    <p className="errorMsg">{errors.password.message}</p>
                                )}
                            </Form.Group>

                            <Button variant="primary" type="submit">Đăng nhập</Button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
};

const mapDispatchToProps = dispatch => ({
    setUser: user => dispatch(setCurrentUser(user)),
    fetchSuppliers: suppliers => dispatch(fetchSuppliers(suppliers)),
    fetchReceipts: receipts => dispatch(fetchReceipt(receipts))
})

export default connect(null, mapDispatchToProps)(Login);
