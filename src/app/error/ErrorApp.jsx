import React from 'react';
import ReactDOM from 'react-dom';
import '@src/shared/theme.scss';

const ErrorView = function(){
    const classBack = window.errorCode == '404' ? 'file-not-found' : 'server-error';
    const errorText = window.errorCode == '404' ? 'Sorry but file not found' : 'Server-side error... please try again';
    return(<div className={'error-back ' + classBack}>
        <h1>{errorText}</h1>
    </div>)
};

ReactDOM.render(ErrorView(), document.getElementById('root'));