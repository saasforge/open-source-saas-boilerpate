import React, { Component } from 'react';

import Alert from '@src/components/alert/Alert';
import ColorPickerField from '@src/components/color-picker-field/ColorPickerField.jsx';

class ColorPickerFieldDemoView extends Component {
    constructor(props) {
        super(props);    
        this.state = {
            color1: '#DB36AB',
            color2: 'rgb(237, 241, 253)',
            color3: 'blue',
            color4: 'orange'
        };
    }
    changeColor = (color, fieldName)=>{
        let colorVal = {};
        colorVal[fieldName] = color;
        this.setState(colorVal);
    }
    render() {
        return (
            <div className="panel-light">
                <div className="row">
                    <div className="col-md-6">
                        <h3>Color Picker Field demo</h3>
                        <h5 className="">Bottom Left</h5>
                        <div>
                            <span>Selected color: <strong>{this.state.color2}</strong></span>
                        </div>
                        <ColorPickerField  
                            changeColorHandler={this.changeColor}
                            colorValue={this.state.color3}
                            placement="bottomLeft"
                            fieldName="color3"
                        />
                        <h5 className="mt-5">Bottom Right</h5>
                        <div>
                            <span>Selected color: <strong>{this.state.color4}</strong></span>
                        </div>
                        <ColorPickerField  
                            changeColorHandler={this.changeColor}
                            colorValue={this.state.color4}
                            placement="bottomRight"
                            fieldName="color4"
                        />
                        <h5 className="mt-5">Top Left</h5>
                        <div>
                            <span>Selected color: <strong>{this.state.color1}</strong></span>
                        </div>
                        <ColorPickerField  
                            changeColorHandler={this.changeColor}
                            colorValue={this.state.color1}
                            placement="topLeft"
                            fieldName="color1"
                        />
                        <h5 className="mt-5">Top Right</h5>
                        <div>
                            <span>Selected color: <strong>{this.state.color2}</strong></span>
                        </div>
                        <ColorPickerField  
                            changeColorHandler={this.changeColor}
                            colorValue={this.state.color2}
                            placement="topRight"
                            fieldName="color2"
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default ColorPickerFieldDemoView;