var Context = require('tingle-context');
var Fastclick = require('fastclick');
Fastclick.attach(document.body);
var Demo = require('./PickerDemo');
React.render(<Demo/>, document.getElementById('TingleDemo'));