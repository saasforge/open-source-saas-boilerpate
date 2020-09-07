import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-free-solid';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import './iconStyle.scss';

library.add(fab);
library.add(fas);
library.add(far);

class Icon extends Component {
    render() {
        if (this.props.icon){
            return(
                <FontAwesomeIcon icon={this.props.icon} 
                    style={{color: (this.props.color || '')}} 
                    className={this.props.className || ''} /> 
            );
        } else {
            return null;
        }
    }
}

export default Icon;