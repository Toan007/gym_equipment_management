import './App.css';
import { Router } from 'react-router-dom';
import { connect } from 'react-redux';

import MainProcessPage from './pages/main-process-page/main-process-page.component';
import LoginPage from './pages/login-page/login-page.component';

const App = ({ currentUser }) =>  {
  return (
    <div className="app">
        <MainProcessPage />
    </div>
  );
}

const mapStateToProps = ({user}) => ({
  currentUser: user.currentUser
})

export default connect(mapStateToProps)(App);
