/**
 * Picker Component for tingle
 * @author peijie.dpj
 *
 * Copyright 2014-2015, Tingle Team, Alinw.
 * All rights reserved.
 */
let classnames = require('classnames');

class PickerKeybar extends React.Component {

    constructor(props) {
        super(props);
        var t = this;

        this.lastKey = '';
    }

    _handleMove(e) {
        let t = this,
            clientX = e.touches[0].clientX,
            clientY = e.touches[0].clientY,
            target = document.elementFromPoint(clientX, clientY);

        let key = target && target.getAttribute('data-key');

        if (key && (key != t.lastKey)) {
            t.props.triggerEvents(key, t.props.onChange);

            t.lastKey = key;
        }
    }

    render() {
        var t = this;

        return (
            <div className={classnames('tPickerKeybar', {
                [t.props.className]: !! t.props.className
            })} onTouchStart={t._handleMove.bind(t)} onTouchMove={t._handleMove.bind(t)}>
                {t.props.keys.map(function(item, index){
                    return <span data-key={item} key={index}>{item}</span>
                })}
            </div>
        )
    }
}

PickerKeybar.defaultProps = {
    className: '',
    keys: [],
    onChange: function(){}
};

// http://facebook.github.io/react/docs/reusable-components.html
PickerKeybar.propTypes = {
    className: React.PropTypes.string,
    keys: React.PropTypes.array,
    onChange: React.PropTypes.func
};

PickerKeybar.displayName = "PickerKeybar";

module.exports = PickerKeybar;