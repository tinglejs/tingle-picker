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
        t.el = React.findDOMNode(t);
        t.scroller = t.refs.scroller.scroller;
        var scrollerEl = React.findDOMNode(t.refs.scroller);
        scrollerEl.style.height = t.props.showSearchBar ? parseInt(t.el.style.height) - 44 + 'px' : parseInt(t.el.style.height) + 'px';
        t.scroller.refresh();        
    }

    componentWillReceiveProps() {
        var t = this;
    }


    _handleKeyChange(value) {
        var t = this;
        t.props.onSearch(value);
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
                height: t.props.height
            }}>
                <SearchBar className={classnames({
                    tDN: t.props.showSearchBar
                })} placeholder='中文/拼音/首字母' value={t.props.filter} onChange={t._handleKeyChange.bind(t)}/>
                <Scroller ref="scroller" bounce={false}>
                    {t._renderItems()}
                </Scroller>
            </div>
        );
    }
}

Picker.defaultProps = {
    filter: '',
    height: 0,
    showKeyBar: false,
    showSearchBar: false,
    onSearch: noop,
    onScroll: noop
}

// http://facebook.github.io/react/docs/reusable-components.html
Picker.propTypes = {
    filter: React.PropTypes.string,
    height: React.PropTypes.number,
    showKeyBar: React.PropTypes.bool,
    onSearch: React.PropTypes.func,
    onScroll: React.PropTypes.func
}

module.exports = Picker;