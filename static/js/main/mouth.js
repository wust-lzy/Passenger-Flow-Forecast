var dom = document.querySelector(".bar .chart");
var bar = echarts.init(dom);
var app = {};

var option;


// Generate data
var category = [];
var lineData = [];
var barData = [];

// option
option = {
    title: {
        // text: "单月整体的客流波动分析",
        // x:'center',
        // y:'top',
        // padding:15,
        // textStyle: {
        //     color: '#ccc'
        // }
        show: false
    },
    // backgroundColor: 'rgb(16, 12, 42)',
    grid: {
        left: "0%",
        top: "10%",
        right: "0%",
        bottom: "0%",
        containLabel: true
    },
    tooltip: {
        backgroundColor: '#222',
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        },
        formatter: '{b}' + '</br>' + '客流量:' + '{c}',
        textStyle: {
            color: '#ccc'
        },
    },
    legend: {
        seletorLabel: {
            borderColor: "#43f"
        },
        //color:'#5c7bd9',
        x: 'right',
        data: ['单月客流量'],
        textStyle: {
            color: '#ccc'
        }
    },
    xAxis: {
        data: category,
        axisLine: {
            lineStyle: {
                color: '#ccc'
            }
        }
    },
    yAxis: {
        splitLine: {show: false},
        axisLine: {
            lineStyle: {
                color: '#ccc'
            }
        }
    },
    series: [{
        name: '单月客流量',
        type: 'line',
        smooth: true,
        showAllSymbol: true,
        symbol: 'emptyCircle',
        symbolSize: 15,
        lineStyle: {
            color: '#5470c6',
        },
        data: lineData
    }, {
        name: 'bar',
        type: 'bar',
        barWidth: 10,
        itemStyle: {
            barBorderRadius: 5,
            color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                    {offset: 0, color: '#14c8d4'},
                    {offset: 1, color: '#43eec6'}
                ]
            )
        },
        data: barData
    }, {
        name: 'line',
        type: 'bar',
        barGap: '-100%',
        barWidth: 10,
        itemStyle: {
            color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                    {offset: 0, color: 'rgba(20,200,212,0.5)'},
                    {offset: 0.2, color: 'rgba(20,200,212,0.2)'},
                    {offset: 1, color: 'rgba(20,200,212,0)'}
                ]
            )
        },
        z: -12,
        data: lineData
    }, {
        name: 'dotted',
        type: 'pictorialBar',
        symbol: 'rect',
        itemStyle: {
            color: '#0f375f'
        },
        symbolRepeat: true,
        symbolSize: [12, 4],
        symbolMargin: 1,
        z: -10,
        data: lineData
    }]
};
$.ajax({
    url: 'static/data/a.json',
    dataType: 'json'
}).done(function (data) {
    category = data['date']
    lineData = data['counts']
    for (let i = 0; i < lineData.length; ++i) {
        barData.push(lineData[i] * 0.9)
    }
    bar.setOption({
        xAxis: {
            data: category,
        },
        series: [{
            data: lineData
        }, {
            data: barData
        }, {
            data: lineData
        }, {
            data: lineData
        }
        ]
    })
})

if (option && typeof option === 'object') {
    bar.setOption(option);
}