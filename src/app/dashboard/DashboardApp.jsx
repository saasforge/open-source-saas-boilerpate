import React from 'react';
import ReactDOM from 'react-dom';
import routes from '@src/app/dashboard/routes';
import { globalVars } from '@src/shared/globalVars';

import '@src/shared/theme.scss';
ReactDOM.render(routes, document.getElementById('root'));