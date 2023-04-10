import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { getAllAccount } from '../../api/accountApi';
import AccountForm from '../../components/account-form/account-form.component'
import AccountTable from '../../components/account-table/account-table.component';

import './account-page.styles.scss';

const AccountPage = ({ user }) => {
    // console.log(user)
    const [visible, setVisible] = useState(false);
    const [accounts, setAccounts] = useState([])
    const [loadData, setLoadData] = useState(1);
    useEffect(async () => {
        try {
            const acc = await getAllAccount() 
    
            setAccounts([...acc])
        } catch (error) {
            alert(error);
        }
    }, [loadData])

    const onVisible = () => {
        setVisible(!visible)
    }

    return (
        <div className="accounts-container page">
            {
                (user.roleName == 'admin') ?
                    <div className="accounts-container page">
                        <h1>Tài khoản</h1>
                        <Button id="account-btn" onClick={() => onVisible()}>Thêm</Button>
                        <AccountTable accounts={accounts} />
                        <AccountForm visible={visible} onVisible={onVisible} setAccount={setAccounts} accounts={accounts} setLoadData = {setLoadData} />
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
};

const mapStateToProps = ({ user }) => ({
    user: user.currentUser
})

export default connect(mapStateToProps)(AccountPage);

