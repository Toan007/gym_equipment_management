import React from 'react';
import { Route } from 'react-router-dom';

import Login from '../../components/login/login.component';

import './login-page.styles.scss';

const LoginPage = () => {
    return (
        <div>
            <div className="img-container">
                    
            </div>
            <Route exact path='/' component={Login} />
        </div>
    )
};

export default LoginPage;