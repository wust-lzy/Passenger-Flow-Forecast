$(function () {
    $("#echartstest").hide();
});
var mydom = document.querySelector(".pie2 .chart");
var mypie = echarts.init(mydom);
var myChart2 = echarts.init(document.getElementById('main2'));
var app = {};

var option;

option = {
    color: ['#df33a5', '#f4b13d', '#1482e5', '#70b4eb', '#5de1d9', '#50beff', '#787cf1', '#b4e0f3'],
    tooltip: {
        backgroundColor: '#222',
        trigger: 'item',
        triggerOn: 'mousemove',
        textStyle: {
            color: '#ccc'
        },
    },
    series: {
        label: {
            textStyle: {
                color: '#ccc'
            }
        },
        itemStyle: {
            borderWidth: 1,
        },
        lineStyle: {

            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#136bff'
            }, {
                offset: 1,
                color: '#87ffd6'
            }]),
            curveness: 0.5,
            opacity: 0.5
        },
        grid: {
            top: '10%',
            bottom: '0%'
        },
        type: 'sankey',
        layout: 'none',
        emphasis: {
            focus: 'adjacency'
        },
        data: [],
        links: []
    },
    dataZoom: [{
        id: 'dataZoomX',
        type: 'slider',
        filterMode: 'filter'
    },
        {
            id: 'dataZoomY',
            type: 'slider',
            filterMode: 'empty'
        }
    ],
};
$.ajax({
    url: 'static/data/line-to-line_od.json',
    dataType: 'json',
    cache: false
}).done(function (data) {
    let datas = []
    let series_data = []
    let series_links = []
    for (let item in data) {
        if (datas.indexOf(data[item]['source']) == -1) {
            datas.push(data[item]['source'])
        }
        if (datas.indexOf(data[item]['target']) == -1) {
            datas.push(data[item]['target'])
        }
        series_links.push({
            source: data[item]['source'],
            target: data[item]['target'],
            value: data[item]['value']
        })
    }
    for (let i in datas) {
        series_data.push({
            name: datas[i]
        })
    }
    mypie.setOption({
        series: {
            data: series_data,
            links: series_links
        }
    })
    mypie.on('click', function (params) {
        $('#echartstest').click();
        // 使用刚指定的配置项和数据显示图表。
        myChart2.setOption({
            series: {
                data: series_data,
                links: series_links
            }
        })
    });
})

if (option && typeof option === 'object') {
    mypie.setOption(option);
    myChart2.setOption(option);
}