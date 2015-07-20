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

// https://github.com/hotoo/pinyin
var pinyin = require('pinyin');

// ES6 析构赋值
var {is, support, TOUCH, noop} = Tingle;
var {mobile: isMobile, pc: isPC} = is;
var {START, MOVE, END, CANCEL} = TOUCH;
var support3D = support['3d'];

class Picker extends React.Component {

    constructor(props) {
        super(props);
        var t = this;
        t.state = {
            list: [],
            keyList: [],
            height: 'auto',
            filter: props.filter
        };

    }

    componentWillMount() {
        var t = this;
        t.sortList = t._sortList(t.props.children);
        t.filterList = t._filterList(t.sortList);
        t._changeList();

    }

    componentDidMount() {
        var t = this;
        var height = document.documentElement.clientHeight || window.innerHeight;
        t.setState({
            height: height
        });
        t.scroller = t.refs.scroller.scroller;
        var scroller = React.findDOMNode(t.refs.scroller);
        scroller.style.height = height - 88 + 'px';
        t.scroller.refresh();        
    }

    componentWillReceiveProps() {
        var t = this;
        t.filterList = t._filterList(t.sortList);
        t.setState({
            list: t.filterList
        });

    }

    handleEvent(e) {
        var t = this;

    }

    /**
     * 列表按子元素排列
     * @param {Array} children props.children
     * @return {Array} 有序列表，按字典序排列
     */

    _sortList(children) {
        var t = this;
        return children.sort(function(a, b) {
            var aIni = a.props['data-name']
            var bIni = b.props['data-name'];
            [aIni, bIni] = [aIni, bIni].map(function(ini, i) {
                return t._getInitial(ini)
            });

            return aIni.localeCompare(bIni);
        });
    }

    /**
     * 按关键字过滤列表
     * @param {Array} list React Element 组成的有序列表
     * @return {Array} 过滤后的列表
     */

    _filterList(list) {
        var t = this;
        var filter = t.state.filter;
        var filterIsChinese = t._isChinese(filter);
        return list.filter(function(ele) {
            var name = ele.props['data-name'];
            if (filterIsChinese) {
                return name.indexOf(filter) > -1
            }
            else {
                if (t._isChinese(name)) {
                    name = t._nameToPinyin(name);
                }
                return name.indexOf(filter) > -1
            }
        });
    }

    /**
     * 讲汉字转化成拼音全拼
     * @param {String} str 汉字
     * @return {String} 拼音
     */

    _nameToPinyin(str) {
        var py = pinyin(str, {
                segment: true,
                style: pinyin.STYLE_NORMAL
            });
        py.map(function(ele, i) {
            return ele[0];
        });
        var str = py.join('');
        return str;
    }

    /**
     * 判断是否是汉字
     */

    _isChinese(str) {
        return /^[\u4e00-\u9fa5]+$/.test(str);
    }

    _getInitial(str) {
        var t = this;
        if (t._isChinese(str)) {
            str = t._nameToPinyin(str)[0]
        }
        else {
            str = str[0]
        }
        return str;
    }

    _changeList() {
        var t = this;
        t.filterList = t._filterList(t.sortList);
        t.keyList = t.filterList.map(function(ele, i) {
            var name = ele.props['data-name'];
            return t._getInitial(name);
        });
        t.keyList = t._dupRemove(t.keyList);
        t.setState({
            list: t.filterList,
            keyList : t.keyList
        });
    }

    _dupRemove(arr) {
        var newArr = [];
        return arr.filter(function(ele) {
            if (newArr.indexOf(ele) > -1) {
                return false;
            }
            else {
                newArr.push(ele);
                return true;
            }
        });
    }

    _handleItemClick(e) {
        var t = this;
        var target = e.currentTarget;
        t.props.onPick(target);
    }

    _handleKeyChange(value) {
        var t = this;
        // setState 是异步执行的，所以要要用回调函数。
        t.setState({
            filter: value
        }, t._changeList.bind(t));

    }

    _renderItems() {
        var t = this;
        var items = [];
        t.state.keyList.forEach(function(ele, i) {
            var arr = [];

            arr.push(<div className="tItemTitle tFCf tFS20 tLH30" key={"tItemTitle" + i}>{ele.toUpperCase()}</div>)
            arr.push(<div className="tItemList" key={"tItemList" + i}>
                        {t.state.list.filter(function(a) {
                            return t._getInitial(a.props['data-name']) == ele
                        }).map(function(e, j) {
                            var newE = React.cloneElement(e, {
                                onClick: t._handleItemClick.bind(t)
                            });
                            return newE;
                        })}
                    </div>)
            items.push(<div className="tPickerItem" key={ele}>
                        {arr}
                       </div>); 
        })
        return items
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
                <SearchBar onChange={t._handleKeyChange.bind(t)}/>
                <Scroller ref="scroller" bounce={false}>
                    {t._renderItems()}
                </Scroller>
            </div>
        );
    }
}

Picker.defaultProps = {
    showKeyBar: false,
    filter: '',
    onPick: noop
}

// http://facebook.github.io/react/docs/reusable-components.html
Picker.propTypes = {
    showKeyBar: React.PropTypes.bool,
    filter: React.PropTypes.string,
    onPick: React.PropTypes.func
}

module.exports = Picker;