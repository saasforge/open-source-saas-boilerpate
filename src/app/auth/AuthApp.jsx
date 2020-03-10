import React from 'react';
import ReactDOM from 'react-dom';
import AuthUI from '@src/modules/auth/AuthUI';

import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { globalVars } from '@src/shared/globalVars';


import '@src/shared/theme/common.scss';
import '@src/shared/theme/auth.scss';

const auth_component = (
    <div className="auth-container"> 
        <div className="auth-info">
            {/*<div className="glint"></div>
            <div className="glint2"></div>*/}
            <div className="welcome">Welcome to {globalVars.COMPANY_NAME}</div>
            <div className="legal">{globalVars.COMPANY_NAME} © {new Date().getFullYear()}</div>
        </div>  
        <div className="auth-form">
            <AuthUI />
        </div>
    </div>
);

ReactDOM.render(auth_component, document.getElementById('auth_root'));