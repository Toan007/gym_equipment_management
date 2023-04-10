import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import {getAllLogEquipment} from '../../api/EquipmentLog'
import RecordTable from '../../components/record-table/record-table.component';
import RecordStateTable from '../../components/state-table/state-table.component';
import Img from "../../assets/home.jpg"



import './homepage.styles.scss';
import { getAllRecord } from '../../api/RecordApi';

const HomePage = ({ user }) => {
    const [staffRecords, setStaffRecords] = useState([])
    const [stateRecords, setStateRecords] = useState([])
    const [btnState, setBtn] = useState('staff');
    useEffect(async () => {
        try {
            const record = await getAllRecord()
            // console.log('record', record)
            setStaffRecords([...record])
            const stateRecord = await getAllLogEquipment()
            setStateRecords([...stateRecord])
        } catch (error) {
            alert(error);
        }
    }, [])
    const handleClick = () => {
        alert('PRINTING')
    }
    const handleChange = event => {
        setBtn(event.target.name)
    }
    return (
        <div className="homepage page">
            {
                (user.roleName == 'admin') ?
                    <div>
                        <div className="btn-group">
                            <Button className={`${btnState == 'staff' ? "chose" : ""}`} type="button" name="staff" onClick={(e) => handleChange(e)}>Nhân viên</Button>
                            <Button className={`${btnState == 'equip' ? "chose" : ""}`} type="button" name="equip" onClick={(e) => handleChange(e)}>Thiết bị</Button>
                        </div>
                        {
                            btnState == 'staff' ?
                                <RecordTable records={staffRecords} /> :
                                <RecordStateTable records={stateRecords} />

                        }
                    </div>
                    :
                    <div class="hover">
                        <div class="background">
                            <div class="door">Administrator</div>
                            <div class="rug"></div>
                        </div>
                        <div class="foreground">
                            <div class="bouncer">
                                <div class="head">
                                    <div class="neck"></div>
                                    <div class="eye left"></div>
                                    <div class="eye right"></div>
                                    <div class="ear"></div>
                                </div>
                                <div class="body"></div>
                                <div class="arm"></div>
                            </div>
                            <div class="poles">
                                <div class="pole left"></div>
                                <div class="pole right"></div>
                                <div class="rope"></div>
                            </div>
                        </div>
                    </div>

            }
        </div>
    )
}

const mapStateToProps = ({ user }) => ({
    user: user.currentUser
})

export default connect(mapStateToProps)(HomePage);