## Picker

 


# Picker 选择器容器

----

## TL;DR

> tingle-picker 是 tingle-xxxpicker 的容器控件。提供一个搜索条和一个可以垂直滚动的列表容器。

效果图：   

![效果图](http://gtms03.alicdn.com/tps/i3/TB1aSZGJXXXXXXvXVXXCN.gZVXX-320-572.png)

## Simple Usage

```javascript

constructor(props) {
    super(props);
    this.state = {
        city: city,
        filter: ''
    };
}

_renderGroupLists() {
    let t = this;
    let arr = []
    let groups = Object.keys(t.state.city);
    groups.forEach(function(group, i) {
        arr.push(<GroupList className={group} title={group} key={group}>
                    {city[group].map(function(city, i) {
                        return <div className="tLH44 tPL10" key={group + i} data-group={group} data-name={city.name} onClick={t._handleClick.bind(t)}>{city.name}</div>
                    })}
                </GroupList>)
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
            })
            if (groupCity.length != 0) {
                newCity[group] = groupCity;
            }
        });
    }
    else {
        groups.forEach(function(group, i) {
            let groupCity = city[group].filter(function(ele) {
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
        </Picker>
  
}
```

## Options 可用配置

| 配置项 | 类型 | 必填 | 默认值 | 功能/备注 |
|---|---|---|---|---|
|filter|string|optional|-|开启搜索时的默认搜索值|
|show|boolean|optional|false|是否显示|
|offsetTop|number|optional|0|picker 的主体部分距离顶端的高度，用于在 picker 插入自定义的部分|
|offsetBottom|number|optional|0|picker 的主体部分距离底端的高度，用于在 picker 插入自定义的部分|
|searchPlaceholder|string|optional|中文/拼音/首字母|
|showSearchBar|boolean|optional|false|是否显示搜索条|
|onSearch|function|optional|-|搜索条中的值发生改变时触发，可以在此时通过更改 filter 来改变 searchbar 里的显示

## Links 相关链接

- [Fire a bug/Issues 提Bug](https://github.com/tinglejs/tingle-picker/issues)
- [Tingle项目](https://github.com/tinglejs)