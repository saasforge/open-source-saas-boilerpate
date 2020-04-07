import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import ColorPicker from 'rc-color-picker';
import 'rc-color-picker/assets/index.css';
import './colorPickerField.scss';

/*
Props:
colorValue - string representation of color ('#FFF', 'orange', 'rgb(255, 255, 255)')
fieldName - name of field that can be used if you call the same handler for different fields
placemenet - string, where to show the color picker panel ('topLeft', 'topRight', 'bottomLeft', 'bottomRight')
*/

class ColorPickerField extends Component {
    constructor(props) {
        super(props);    
        this.state = {
        };
    }
    handleChangeColorText =(event)=>{
        this.props.changeColorHandler(event.target.value, this.props.fieldName);
    }
    handleChangeColorPicker = (event)=>{
        this.props.changeColorHandler(event.color, this.props.fieldName);
    }
    fixPlacement = (placement)=>{
        if (placement.indexOf('Left') > -1){
            return placement.replace('Left', 'Right');
        } else {
            return placement.replace('Right', 'Left');
        }
    }
    render() {
        return   (                 
            <div className="color-block">
                <input type="text" className="form-control" 
                    onChange={this.handleChangeColorText}
                    value={this.props.colorValue} />
                    <ColorPicker
                        animation="slide-up"
                        color={this.props.colorValue || '#f4f4f4'}
                        onChange={this.handleChangeColorPicker}
                        placement={this.fixPlacement(this.props.placement)}
                    />
            </div>);
    }
}

export default ColorPickerField;