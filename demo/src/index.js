/**
 * Picker Component Demo for tingle
 * @author eternalsky
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
require('tingle-context');
window.FastClick && FastClick.attach(document.body);
var Demo = require('./PickerDemo');
ReactDOM.render(<Demo/>, document.getElementById('TingleDemo'));
