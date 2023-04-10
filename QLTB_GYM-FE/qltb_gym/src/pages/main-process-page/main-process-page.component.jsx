import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, BrowserRouter, withRouter } from 'react-router-dom';

import HomePage from '../home-page/home-page.component';
import Header from '../../components/header/header.component';
import LoginPage from '../../pages/login-page/login-page.component';
import SupplierPage from '../suppliers-page/suppliers-page.conponent';
import ReceiptPage from '../receipt-page/receipt-page.component';
import AddDevicePage from '../add-device-page/add-device-page.component';
import EquipmentPage from '../equipment-page/equipment-page.component';
import SupplierEdit from '../supplier-edit-page/supplier-edit-page.component';
import ReceiptEdit from '../receipt-edit-page/receipt-edit-page.component';
import EquipmentEdit from '../equipment-edit-page/equipment-edit-page.component';
import BodyWrapper from '../../components/body-wrapper/body-wrapper.component';
import AccountPage from '../../pages/account-page/account-page.component';
import ProfilePage from '../../pages/profile-page/profile-page.component';
import EquipGroupPage from '../../pages/equipmentgroup-page/equipmentgroup-page.component';
import EquipmentGroupEdit from '../equipmentgroup-edit-page/equipmentgroup-edit-page.component';


import './main-process-page.styles.scss';

const MainProcessPage = ({ user }) => {
    return (
      <BrowserRouter>
            {
              !user?
              <LoginPage />:
              <div className="main-container">
                  <BodyWrapper />
                  {/* <Header /> */}
                  <Switch>
                    <Route exact path="/manage" component={HomePage} />
                    <Route exact path="/account" component={AccountPage} />
                    <Route exact path="/suppliers" component={SupplierPage} />
                    <Route exact path="/receipt" component={ReceiptPage} />
                    <Route exact path="/receipt/adddevice" component={AddDevicePage} />
                    <Route exact path="/equipment" component={EquipmentPage} />
                    <Route path="/suppliers/:suppId" component={SupplierEdit} />
                    <Route exact path="/receipt/:rcpId" component={ReceiptEdit} />
                    <Route exact path="/equipment/:equipId" component={EquipmentEdit} />
                    <Route exact path="/equipment_group" component={EquipGroupPage} />
                    <Route exact path="/equipment_group/:equipGroupId" component={EquipmentGroupEdit} />
                    <Route exact path="/profile" component={ProfilePage} />
                    <Route path="/*" component={() => "404 not found"} />
                  </Switch>
              </div>
            }
      </BrowserRouter>
    )
}

const mapStateToProps = ({user}) => ({
  user: user.currentUser
})

export default connect(mapStateToProps)(MainProcessPage);