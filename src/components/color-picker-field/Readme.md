# Color Picker Field
Includes a form input accompanied with color picker, based on [React Color Picker](https://github.com/react-component/color-picker).

See them in action:
![Color Picker Field](https://github.com/saasforge/saas-forge-public-docs/blob/master/color-picker-field.png?raw=true)

## Features
You can specify:
- color in any form
- name of linked field
- placement
- handler for color change



## How to use
### Props:
- **colorValue** - string representation of color ('#FFF', 'orange', 'rgb(255, 255, 255)')
- **fieldName** - name of field that can be used if you call the same handler for different fields
- **placemenet** - string, where to show the color picker panel ('topLeft', 'topRight', 'bottomLeft', 'bottomRight')
- **changeColorHandler** - the pointer to the color change handler in the parent component; takes 2 parameters: color, fieldName

```javascript
import ColorPickerField from '@src/components/color-picker-field/ColorPickerField.jsx';
```

```html
    <ColorPickerField  
        changeColorHandler={this.changeColor2}
        colorValue={this.state.color2}
        placement="bottomRight"
        fieldName="color2"
    />
```

#### Component props
- **icon**(string or array of strings) - icon name (accordingly to Fontawesome naming)
- **color**(string) - color name, for example "green" or "#FFF"
- **className**(string or array of strings) - custom icon class name

### Full example of using

```javascript
import ColorPickerField from '@src/components/color-picker-field/ColorPickerField.jsx';

class ColorPickerFieldDemoView extends Component {
    constructor(props) {
        super(props);    
        this.state = {
            color: '#DB36AB',
            color2: 'red'
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
                            <span>Selected color: <strong>{this.state.color}</strong></span>
                        </div>
                        <ColorPickerField  
                            changeColorHandler={this.changeColor}
                            colorValue={this.state.color}
                            placement="bottomLeft"
                            fieldName="color"
                        />
                        <ColorPickerField  
                            changeColorHandler={this.changeColor2}
                            colorValue={this.state.color2}
                            placement="bottomRight"
                            fieldName="color2"
                        />
                    </div>
                </div>
            </div>);
    }
}
export default ColorPickerFieldDemoView;
```