class PickerList1 extends React.Component {

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

PickerList1.defaultProps = {
}

// http://facebook.github.io/react/docs/reusable-components.html
PickerList1.propTypes = {
}

PickerList1.displayName = "PickerList";

module.exports = PickerList1;