/**
 * Picker Component for tingle
 * @author eternalsky
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
 
// 引入
let classnames = require('classnames');
let Scroller =  require('tingle-scroller');
let SearchBar = require('tingle-search-bar');
let Context = require('tingle-context');
let PickerList = require('./PickerList');
let PickerKeybar = require('./PickerKeybar');


class Picker extends React.Component {

    constructor(props) {
        super(props);
        let t = this;
        t.state = {
        };

    }

    componentDidMount() {
        let t = this;
        let winHeight = document.documentElement.clientHeight || window.innerHeight;
        t.el = React.findDOMNode(t);
        t.scroller = t.refs.scroller;
        let scrollerEl = React.findDOMNode(t.scroller);
        let mainBox = t.el.querySelector('.tPickerMainBox');
        mainBox.style.height = winHeight - t.props.offsetTop - t.props.offsetBottom + 'px';
        scrollerEl.style.height = t.props.showSearchBar ? parseInt(mainBox.style.height) - 44 + 'px' : parseInt(mainBox.style.height) + 'px';
        t.scroller.scroller.refresh(); 
        t.scroller.scroller.on("scrollStart", () => {
            document.activeElement.blur();
        });       
    }

    _handleKeyChange(value) {
        let t = this;
        t.props.onSearch(value);
    }

    _handleKeybarChange(key, onChange) {
        let t = this,
            scroller = this.refs.scroller;

        let childrens = scroller.el.childNodes[0].childNodes[0].children,
            scrollerHeight = scroller.el.childNodes[0].offsetHeight,
            screenHeight = parseInt(scroller.el.style.height),
            scrollNums = 0;

        for (var i = 0; i < childrens.length; i++) {
            let item = childrens[i];
            if (item.firstChild.innerHTML == key) {
                scrollNums = item.offsetTop;
            }
        }

        scrollNums = t.props.showSearchBar ? scrollNums - 44 : scrollNums;

        if (scrollNums > scrollerHeight - screenHeight) {
            scrollNums = scrollerHeight - screenHeight
        }

        scroller.scroller.scrollTo(0, -scrollNums);

        onChange && onChange(key);
    }

    _renderLists() {
        let t = this;
        let arr = [];
        React.Children.map(t.props.children, function(ele) {
            if (ele && typeof ele.type == 'function' && ele.type.displayName == 'PickerList') {
                arr.push(ele)
            }
        });
        return arr;
    }

    _renderKeybar() {
        let t = this;
        let arr = [];
        React.Children.map(t.props.children, function(ele) {
            if (!ele || typeof ele.type !== 'function' || ele.type.displayName == 'PickerKeybar') {
                 arr.push(React.cloneElement(ele, {
                    triggerEvents: t._handleKeybarChange.bind(t)
                }));
            }
        });
        return arr;
    }

    _renderOthers() {
        let t = this;
        let arr = [];
        React.Children.map(t.props.children, function(ele) {
            if (!ele || typeof ele.type !== 'function' || (ele.type.displayName !== 'PickerList' && ele.type.displayName !== 'PickerKeybar')) {
                arr.push(ele)
            }
        });
        return arr;
    }

    render() {
        let t = this;
        let arr = [];
        let winHeight = document.documentElement.clientHeight || window.innerHeight;
        if (t.props.showSearchBar) {
            arr.push(<SearchBar key="searchbar" placeholder={t.props.searchPlaceholder} value={t.props.filter} onChange={t._handleKeyChange.bind(t)}/>)
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
                {t._renderKeybar()}
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
};

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
};


Picker.List = PickerList;
Picker.Keybar = PickerKeybar;

module.exports = Picker;