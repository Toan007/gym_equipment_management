import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

import ProfileForm from '../../components/profile-form/profile-form.component';

import { BackgroundImage } from './profile-page.styles.jsx';

import { selectSupplier } from '../../redux/supplier/supplier.selectors';
import { updateSupplier } from '../../redux/supplier/supplier.actions';
import moment from 'moment';
import { TiWarning } from 'react-icons/ti';
import { RiExchangeLine } from 'react-icons/ri';


import './profile-page.styles.scss';
import { getAllStaff, updateStaff } from '../../api/StaffApi';

const ProfilePage = ({ supplier, history, user }) => {
    const [profile, setProfile] = useState({})
    const [visible, setVisible] = useState(false);
    const [check, setCheck] = useState(true)
    useEffect(async () => {
        try {
            const record = await getAllStaff(user.id)
            console.log("satff", record)
            setProfile(record)
        } catch (error) {
            alert(error);
        }
    }, [])

    const onVisible = () => {
        setVisible(!visible)
    }
    const handleChange = event => {
        const { value, name } = event.target
        setProfile({ ...profile, [name]: value })
        setCheck(false)
    }
    const handleSubmit = async () => {
        try {
            const newDate = profile.date + " 00:00:00.00000"
            const respone = await updateStaff(profile.staffId, profile.cmnd, profile.firstName, 
                profile.lastName, newDate)

            // console.log("CMND",   respone)
            setCheck(true)
            if(respone){
                return alert("Thay đổi thông tin thành công")

            }
            else {
                alert("Trùng CMND!")
            }
            
        } catch (error) {
            alert("Thay đổi thông tin thất bại")
        }
    }
    // const uploadImage = (e) => {
    //     let file = e
    //     let reader = new FileReader();
    //     reader.onloadend = async function () {
    //         try {
    //             const respone = await axios.post(`${process.env.REACT_APP_API}/change-avatar`, {
    //                 accountId: user.id,
    //                 data: reader.result
    //             })

    //             setProfile({ ...profile, avatar: reader.result })
    //             return alert("Thay đổi thông tin thành công")
    //         } catch (error) {
    //             alert("Thay đổi thông tin thất bại")
    //         }
    //     }
    //     reader.readAsDataURL(file);
    // }

    return (
        <div className="page">
            <div className="image-container">
                <BackgroundImage image={profile.avatar ? profile.avatar : 'https://i.pinimg.com/564x/d9/7b/bb/d97bbb08017ac2309307f0822e63d082.jpg'} alt="avatar" />
                <RiExchangeLine />
                {/* <input type="file" onChange={e => uploadImage(e.target.files[0])}></input> */}
            </div>
            <div className="info">
                <Form className="input-form new">
                    {
                        check ? <p></p> : <p className="warnning">chưa lưu<TiWarning /></p>
                    }
                    <div className="col-l-9 offset-md-1">
                        <div className="name">
                            <Form.Group controlId="firstName">
                                <Form.Label>Họ</Form.Label>
                                <Form.Control
                                    name="firstName"
                                    value={profile.firstName}
                                    onChange={event => handleChange(event)}
                                />
                            </Form.Group>
                            <Form.Group controlId="lastName">
                                <Form.Label>Tên</Form.Label>
                                <Form.Control
                                    name="lastName"
                                    value={profile.lastName}
                                    onChange={event => handleChange(event)}
                                />
                            </Form.Group>
                        </div>
                        <Form.Group controlId="cmnd">
                            <Form.Label>CMND</Form.Label>
                            <Form.Control
                                name="cmnd"
                                value={profile.cmnd}
                                onChange={event => handleChange(event)}
                            />
                        </Form.Group>
                        <Form.Group controlId="date">
                            <Form.Label>Ngày sinh</Form.Label>
                            <Form.Control
                                type="date"
                                name="date"
                                value={moment(profile.date).format("yyyy-MM-DD")}
                                // defaultValue={moment(profile.date).format("yyyy-MM-DD")}
                                onChange={event => handleChange(event)}
                            />
                            {/* {console.log("dateeee",profile.date)}
                            {console.log("dat1111",moment(profile.date).format("DD-MM-yyyy"))} */}
                        </Form.Group>
                        <div className="group-btn">
                            <Button
                                onClick={() => handleSubmit()}
                                variant="primary" type="button">Lưu</Button>
                            <Button
                                onClick={() => onVisible()}
                                variant="primary" type="button">Đổi mật khẩu</Button>
                        </div>
                    </div>
                </Form>
            </div>
            <ProfileForm visible={visible} onVisible={onVisible} user={user} />
        </div>
    )
}

const mapStateToProps = (state, ownProps) => ({
    supplier: selectSupplier(ownProps.match.params.suppId)(state),
    user: state.user.currentUser
})

const mapDispatchToProps = dispatch => ({
    updateSupplier: (index, data) => dispatch(updateSupplier(index, data))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProfilePage));