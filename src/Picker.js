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
var PickerList = require('./PickerList.js')


// ES6 析构赋值


class Picker extends React.Component {

    constructor(props) {
        super(props);
        var t = this;
        t.state = {
        };

    }

    componentDidMount() {
        var t = this;
        var winHeight = document.documentElement.clientHeight || window.innerHeight;
        t.el = React.findDOMNode(t);
        t.scroller = t.refs.scroller;
        t.scrollerEl = React.findDOMNode(t.scroller);
        t.mainBox = t.el.querySelector('.tPickerMainBox');
        t.mainBox.style.height = winHeight - t.props.offsetTop - t.props.offsetBottom + 'px';
        t.scrollerEl.style.height = t.props.showSearchBar ? parseInt(t.mainBox.style.height) - 44 + 'px' : parseInt(t.mainBox.style.height) + 'px';
        t.scroller.scroller.refresh();        
    }

    componentWillReceiveProps() {
        var t = this;
    }


    _handleKeyChange(value) {
        var t = this;
        t.props.onSearch(value);
    }

    _renderLists() {
        var t = this;
        var arr = [];
        React.Children.map(t.props.children, function(ele) {
            if (ele && typeof ele.type == 'function' && ele.type.displayName == 'PickerList') {
                arr.push(ele)
            }
        });
        return arr;
    }

    _renderOthers() {
        var t = this;
        var arr = [];
        React.Children.map(t.props.children, function(ele) {
            if (!ele || typeof ele.type !== 'function' || ele.type.displayName !== 'PickerList') {
                arr.push(ele)
            }
        });
        return arr;
    }

    render() {
        var t = this;
        var arr = [];
        var winHeight = document.documentElement.clientHeight || window.innerHeight;
        if (t.props.showSearchBar) {
            arr.push(<SearchBar placeholder={t.props.searchPlaceholder} value={t.props.filter} onChange={t._handleKeyChange.bind(t)}/>)
        }
        return (
            <div className={classnames({
                "tPicker t3D": true,
                [t.props.className]: !!t.props.className
            })} style={{
                height: winHeight,
                display: t.props.show ? 'block' : 'none'
            }}>
                {t._renderOthers()}
                <div className="tPickerMainBox" style={{
                    top: t.props.offsetTop
                }}>
                    {arr}
                    <Scroller ref="scroller" bounce={false} mouseWheel={Context.isPC ? true : false}>
                        {t._renderLists()}
                    </Scroller>
                </div>
            </div>
        );
    }
}

Picker.defaultProps = {
    filter: '',
    show: false,
    offsetTop: 0,
    offsetBottom: 0,
    searchPlaceholder: '中文/拼音/首字母',
    showKeyBar: false,
    showSearchBar: false,
    onSearch: Context.noop,
    onScroll: Context.noop
}

// http://facebook.github.io/react/docs/reusable-components.html
Picker.propTypes = {
    filter: React.PropTypes.string,
    show: React.PropTypes.bool,
    offsetTop: React.PropTypes.number,
    offsetBottom: React.PropTypes.number,
    searchPlaceholder: React.PropTypes.string,
    showKeyBar: React.PropTypes.bool,
    showSearchBar: React.PropTypes.bool,
    onSearch: React.PropTypes.func,
    onScroll: React.PropTypes.func
}


Picker.list = PickerList;

module.exports = Picker;