/**
 * Picker Component for tingle
 * @auther guanghong.wsj
 *
 * Copyright 2014-2015, Tingle Team, Alinw.
 * All rights reserved.
 */
class PickerList extends React.Component {

    constructor(props) {
        super(props);
        var t = this;
    }
    render() {
        var t = this;
        return (
            <div className="tPickerList">
                {t.props.children}
            </div>
        )
    }
}

PickerList.defaultProps = {
}

// http://facebook.github.io/react/docs/reusable-components.html
PickerList.propTypes = {
}

PickerList.displayName = "PickerList";

module.exports = PickerList;