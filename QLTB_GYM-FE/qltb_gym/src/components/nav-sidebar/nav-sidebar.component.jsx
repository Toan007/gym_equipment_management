import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';

import { BiReceipt, BiLogOut, BiHistory, BiUserPin, BiArchive, BiDumbbell, BiNotepad, BiListUl } from 'react-icons/bi';

import { signOut } from '../../redux/user/user.actions';

import 'react-pro-sidebar/dist/css/styles.css';

const NavSidebar = ({ signOut }) => {
    const [collapsed, setCollapsed] = useState(false)

    return (
        
            <ProSidebar
                collapsed={collapsed}
                breakPoint="md"
            >
                <SidebarHeader>
                    <div
                        style={{
                            padding: '24px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: 14,
                            letterSpacing: '1px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            cursor: 'pointer'
                        }}
                        onClick={() => setCollapsed(!collapsed)}
                    >
                    qlpg
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape="circle">
                        <SubMenu title="Quản lý"
                            icon={<BiNotepad/>}
                        >
                            <MenuItem
                                icon={<BiHistory/>}
                            >
                                <Link to="/manage">Lịch sử</Link>
                            </MenuItem>
                            <MenuItem>
                                <Link to="/account">Tài khoản</Link>
                            </MenuItem>
                        </SubMenu>
                        <MenuItem
                            icon={<BiArchive/>}
                        >
                            <Link to="/suppliers">Nhà cung cấp</Link>
                        </MenuItem>
                        <MenuItem
                            icon={<BiReceipt/>}
                        >
                            <Link to="/receipt">Hóa đơn</Link>
                        </MenuItem>
                        <MenuItem
                            icon={<BiDumbbell/>}
                        >
                            <Link to="/equipment">Thiết bị</Link>
                        </MenuItem>
                        <MenuItem
                            icon={<BiDumbbell/>}
                        >
                            <Link to="/equipment_group">Loại thiết bị</Link>
                        </MenuItem>
                        <MenuItem
                            icon={<BiUserPin/>}
                        >
                            <Link to="/profile">Tài khoản cá nhân</Link>
                        </MenuItem>
                        <MenuItem
                            icon={<BiLogOut/>}
                        >
                            <Link to="/" onClick={() => signOut()}>Đăng xuất</Link>
                        </MenuItem>
                    </Menu>
                </SidebarContent>
            </ProSidebar>        
    )
};

const mapStateToProps = ({user}) => ({
    user: user.currentUser
})

const mapDispatchToProps = dispatch => ({
    signOut: () => dispatch(signOut())
})

export default connect(mapStateToProps, mapDispatchToProps)(NavSidebar);
