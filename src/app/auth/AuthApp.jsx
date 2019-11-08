import React from 'react';
import ReactDOM from 'react-dom';
import AuthUI from './components/auth_ui/AuthUI';

import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/css/bootstrap.min.css';


import '@src/shared/global.scss';
import '@src/app/auth/auth.scss';

const auth_component = (
    <div className="form-auth">
        <AuthUI />
    </div>
);

ReactDOM.render(auth_component, document.getElementById('auth_root'));