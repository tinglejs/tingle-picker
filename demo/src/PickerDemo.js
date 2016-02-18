/**
 * Picker Component Demo for tingle
 * @author eternalsky
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */

let classnames = require('classnames');
// let GroupList = require('tingle-group-list');
let Group = require('tingle-group');

let Picker = require('../../src');

const city = {
    "B": [
        {
            name: '北京',
            abbr: 'bj',
            pinyin: 'beijing'
        }
    ],
    "C": [
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
    "H": [
        {
            name: '杭州',
            abbr: 'hz',
            pinyin: 'hangzhou'
        }
    ],
    "S": [
        {
            name: '上海',
            abbr: 'sh',
            pinyin: 'shanghai' 
        }
    ],
    "N": [
        {
            name: '南京',
            abbr: 'nj',
            pinyin: 'nanjing'
        },
        {
            name: '南宁',
            abbr: 'nn',
            pinyin: 'nanning'
        }
    ],
    "W": [
        {
            name: '武汉',
            abbr: 'wh',
            pinyin: 'wuhan'
        }
    ]
};

class Demo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            city: city,
            filter: ''
        };
    }

    _renderGroupLists() {
        let t = this;
        let arr = [];
        let groups = Object.keys(t.state.city);
        groups.forEach(function(group, i) {
            arr.push(<Group key={group}>
                        <Group.Head>{group}</Group.Head>
                        <Group.List>
                            {city[group].map(function(city, i) {
                            return <div className="tLH44" key={group + i} data-group={group} data-name={city.name} onClick={t._handleClick.bind(t)}>{city.name}</div>
                        })}
                        </Group.List>
                    </Group>)
        });
        return arr;
    }

    _handleClick(e) {
        let t = this;
        let target = e.currentTarget;
        let name = target.getAttribute('data-name');
        let group = target.getAttribute('data-group');
        let data = city[group].filter(function(ele) {return ele.name == name})[0];
        alert(data.name);
    }

    _handleSearch(value) {
        let t = this;
        t._filterList(value);
        t.setState({
            filter: value
        })
    }

    /**
     * 判断是否是汉字
     */

    _isChinese(str) {
        return /^[\u4e00-\u9fa5]+$/.test(str);
    }

    _filterList(value) {
        let t = this;
        let groups = Object.keys(city);
        let newCity = {};
        if (t._isChinese(value)) {
            groups.forEach(function(group, i) {
                let groupCity = city[group].filter(function(ele) {
                    return ele.name.indexOf(value) != -1
                });
                if (groupCity.length != 0) {
                    newCity[group] = groupCity;
                }
            });
        }
        else {
            groups.forEach(function(group, i) {
                let groupCity = city[group].filter(function(ele) {
                    return ele.abbr.indexOf(value) != -1 || ele.pinyin.indexOf(value) != -1
                });
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
        let t = this;
        
        return (
            <Picker
            show={true} 
            showSearchBar={true}
            filter={t.state.filter}
            onSearch={t._handleSearch.bind(t)}>
                <Picker.List>
                    {t._renderGroupLists()}
                </Picker.List>
                <Picker.Keybar keys={['B', 'C', 'H', 'S', 'N', 'W']} />
            </Picker>
        );
    }
}
module.exports = Demo;