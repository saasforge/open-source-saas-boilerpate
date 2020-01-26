var shortid = require('shortid');

var commonFunctions = {
    removeElementFromArray: function(array, element){
        var indexOfElement = array.indexOf(element);
        if (indexOfElement != -1){
            array.splice(indexOfElement, 1);
        }
    },
    capitalizeFirstLetter: function(string){
        if (typeof string !== 'string') {
            return '';
        }
        return string.charAt(0).toUpperCase() + string.slice(1);
    },
    checkUUID: function(string){
        var result = string.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
        return (result != null);
    },
    parseUnits: function(str, precision){
        var val = '', units = '';
        try {
            if (str){
                val = str.replace('%', '').replace('px', '').replace('vh', '').replace('vw', '');
                units = str.replace(val, '');
                if (precision == 'float'){
                    val = parseFloat(val) || 0;
                } else {
                    val = parseInt(val) || 0;
                }
            }
        } catch(err){
            val = '', units = '';
        }
        return {
            value: val,
            units: units
        }
    },
    // Comapres content of arrays
    areArraysEqual: function(array1, array2){
        return (array1.length === array2.length && array1.sort().every(function(value, index) { 
            return value === array2.sort()[index]
        }));
    },
    generateShortId: function(prefix){
        var candidate = shortid.generate();
        if (prefix){
            return (prefix + candidate);
        }
        while (!isNaN(parseInt(candidate[0])) || candidate[0] == '_'){
            candidate = shortid.generate();
            //console.log('try to generate id')
        }
        candidate = candidate.replace('-', ''); // Remove any dashes, just in case
        return candidate;
    },
    detectFonts: function(){
        // a font will be compared against all the three default fonts.
        // and if it doesn't match all 3 then that font is not available.
        var baseFonts = ["monospace", "sans-serif", "serif"];
    
        //we use m or w because these two characters take up the maximum width.
        // And we use a LLi so that the same matching fonts can get separated
        var testString = "mmmmmmmmmmlli";
    
        //we test using 72px font size, we may use any size. I guess larger the better.
        var testSize = "72px";
    
        var h = document.getElementsByTagName("body")[0];
    
        // create a SPAN in the document to get the width of the text we use to test
        var s = document.createElement("span");
        s.style.fontSize = testSize;
        s.innerHTML = testString;
        var defaultWidth = {};
        var defaultHeight = {};
        for (var index in baseFonts) {
            //get the default width for the three base fonts
            s.style.fontFamily = baseFonts[index];
            h.appendChild(s);
            defaultWidth[baseFonts[index]] = s.offsetWidth; //width for the default font
            defaultHeight[baseFonts[index]] = s.offsetHeight; //height for the defualt font
            h.removeChild(s);
        }
    
        function detect(font) {
            var detected = false;
            for (var index in baseFonts) {
                s.style.fontFamily = font + ',' + baseFonts[index]; // name of the font along with the base font for fallback.
                h.appendChild(s);
                var matched = (s.offsetWidth != defaultWidth[baseFonts[index]] || s.offsetHeight != defaultHeight[baseFonts[index]]);
                h.removeChild(s);
                detected = detected || matched;
            }
            return detected;
        }
    
        var fontGroups = ['Arial', 'Arial Black', 'Brush Script MT', 'Comic Sans MS', 'Courier New', 'Georgia',
            'Helvetica', 'Impact', 'Lucida Sans', 'Open Sans', 'Tahoma', 'Times New Roman', 'Trebuchet MS', 'Verdana'];
        var res = [];
        for (var i = 0; i < fontGroups.length; i++){
            var detected = detect(fontGroups[i]);
            if (detected){
                res.push(fontGroups[i]);
            }
        }
        return res;
    }
};
export { commonFunctions };