/**
 * Picker Component for tingle
 * @auther guanghong.wsj
 *
 * Copyright 2014-2015, Tingle Team, Alinw.
 * All rights reserved.
 */

// 引入
var classnames = require('classnames');
var Scroller =  require('tingle-scroller');
var SearchBar = require('tingle-search-bar');
var Context = require('tingle-context');


// ES6 析构赋值
var {is, support, TOUCH, noop} = Context;
var {mobile: isMobile, pc: isPC} = is;
var {START, MOVE, END, CANCEL} = TOUCH;
var support3D = support['3d'];

class Picker extends React.Component {

    constructor(props) {
        super(props);
        var t = this;
        t.state = {

        };

    }

    componentDidMount() {
        var t = this;
        var height = document.documentElement.clientHeight || window.innerHeight;
        t.setState({
            height: height
        });
        t.scroller = t.refs.scroller.scroller;
        var scroller = React.findDOMNode(t.refs.scroller);
        scroller.style.height = height - 44 + 'px';
        t.scroller.refresh();        
    }

    componentWillReceiveProps() {
        var t = this;
    }


    _handleKeyChange(value) {
        var t = this;
        t.setState({
            filter: value
        }, function() {
            t.props.onSearch(value);
        });

    }

    _renderItems(){
        var t = this;
        return t.props.children;
    }

    render() {
        var t = this;
        return (
            <div className={classnames({
                "tPicker t3D": true,
                [t.props.className]: !!t.props.className
            })} style={{
                height: t.state.height
            }}>
                <SearchBar placeholder='中文/拼音/首字母' value={t.state.filter} onChange={t._handleKeyChange.bind(t)}/>
                <Scroller ref="scroller" bounce={false}>
                    {t._renderItems()}
                </Scroller>
            </div>
        );
    }
}

Picker.defaultProps = {
    showKeyBar: false,
    onSearch: noop,
    onScroll: noop
}

// http://facebook.github.io/react/docs/reusable-components.html
Picker.propTypes = {
    showKeyBar: React.PropTypes.bool,
    onSearch: React.PropTypes.func,
    onScroll: React.PropTypes.func
}

module.exports = Picker;