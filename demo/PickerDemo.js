/**
 * Picker Component Demo for tingle
 * @auther guanghong.wsj
 *
 * Copyright 2014-2015, Tingle Team, Alinw.
 * All rights reserved.
 */
var classnames = require('classnames');
var pinyin = require('pinyin');

var Picker = require('../src');

class Demo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            city: ['长春', '北京', '上海', '广州', '长沙', '武汉', '南京', '天津', '石家庄'],
            height: 'auto'
        };
        var t = this;
    }

    componentDidMount() {
        var height = document.documentElement.clientHeight || window.innerHeight;
        var t = this;
        t.setState({
            height: height
        })
    }

    handlePick(data) {
        alert(data.getAttribute('data-name'));

    }

    render() {
        var t = this;
        return (
            <div className="pickerDemo" style={{
                height: t.state.height
            }}>
                <div className="filterBG"></div>
                <Picker onPick={t.handlePick.bind(t)}>
                    {t.state.city.map(function(ele, i) {
                        return <div className="pickerItem tFS16" key={ele} data-name={ele}>{ele}</div>
                    })}
                </Picker>
            </div>
        );
    }
};

module.exports = Demo;