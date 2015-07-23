/**
 * Picker Component Demo for tingle
 * @auther guanghong.wsj
 *
 * Copyright 2014-2015, Tingle Team, Alinw.
 * All rights reserved.
 */
var classnames = require('classnames');
var GroupList = require('tingle-group-list');
var TextField = require('tingle-text-field');

var Picker = require('../src');

var city = {
    "b": [
        {
            name: '北京',
            abbr: 'bj',
            pinyin: 'beijing'
        }
    ],
    "c": [
        {
            name: '重庆',
            abbr: 'cq',
            pinyin: 'chongqing' 
        },
        {
            name: '长春',
            abbr: 'ch',
            pinyin: 'changchun' 
        }
    ],
    "h": [
        {
            name: '杭州',
            abbr: 'hz',
            pinyin: 'hangzhou'
        }
    ],
    "s": [
        {
            name: '上海',
            abbr: 'sh',
            pinyin: 'shanghai' 
        }
    ],
    "n": [
        {
            name: '南京',
            abbr: 'nj',
            pinyin: 'nanjing'
        }
    ],
    "w": [
        {
            name: '武汉',
            abbr: 'wh',
            pinyin: 'wuhan'
        }
    ]
}

class Demo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            city: {},
            height: 'auto',
            show: false,
            selectedCity: '',
            filter: ''
        };
        var t = this;
    }

    componentWillMount() {
        var t = this;
        t.city = city;
        t.filterList('');
    }

    componentDidMount() {
        var height = document.documentElement.clientHeight || window.innerHeight;
        var t = this;
        t.setState({
            height: height
        })
    }

    _renderGroupLists() {
        var t = this;
        var arr = []
        var groups = Object.keys(t.state.city);
        groups.forEach(function(group, i) {
            arr.push(<GroupList className={group} title={group.toUpperCase()} key={group}>
                        {t.state.city[group].map(function(city, i) {
                            return <div className="tLH44 tPL10" key={group + city.pinyin} data-group={group} data-name={city.name} onClick={t.handleClick.bind(t)}>{city.name}</div>
                        })}
                    </GroupList>)
        });
        return arr;
    }

    handleClick(e) {
        var t = this;
        var target = e.currentTarget;
        var name = target.getAttribute('data-name');
        var group = target.getAttribute('data-group');
        console.log(t.state.city[group].filter(function(ele) {
            return ele.name == name;
        })[0]);
        t.setState({
            selectedCity: name,
            show: false
        });

    }

    handleSearch(value) {
        var t = this;
        t.filterList(value);
    }

    handleFieldClick() {
        var t = this;
        t.setState({
            show: true
        })
    }

    /**
     * 判断是否是汉字
     */

    _isChinese(str) {
        return /^[\u4e00-\u9fa5]+$/.test(str);
    }

    filterList(value) {
        var t = this;
        var city = t.city;
        var groups = Object.keys(city);
        var newCity = {};
        if (t._isChinese(value)) {
            groups.forEach(function(group, i) {
                var groupCity = city[group].filter(function(ele) {
                    return ele.name.indexOf(value) != -1
                })
                if (groupCity.length != 0) {
                    newCity[group] = groupCity;
                }
            });
        }
        else {
            groups.forEach(function(group, i) {
                var groupCity = city[group].filter(function(ele) {
                    return ele.abbr.indexOf(value) != -1 || ele.pinyin.indexOf(value) != -1
                })
                if (groupCity.length != 0) {
                    newCity[group] = groupCity;
                }
            });
        }
        t.setState({
            city: newCity
        })
    }

    render() {
        var t = this;
        var arr = [
            <GroupList title="picker Demo">
                <ul className="tFBH tFBJ tFBJC selectField">
                    <li className="label">城市</li>
                    <li className="text" onClick={t.handleFieldClick.bind(t)}>{t.state.selectedCity ? t.state.selectedCity : '请选择'}</li>
                </ul>
            </GroupList>,
            <div className="pickerDemo tBCd" style={{
                display: t.state.show ? 'block' : 'none'
            }}>
                <Picker onSearch={t.handleSearch.bind(t)} ref="picker" filter={t.state.filter}>
                    {t._renderGroupLists()}
                </Picker>
            </div>
        ];
        return <div>
                    {arr}
               </div>
    }
};

module.exports = Demo;