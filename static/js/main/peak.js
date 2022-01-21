var peak = echarts.init(document.querySelector(".line .chart"))
var option;
// option
var xAxisData = [];
var data1 = [];
var data2 = [];

option = {
    grid: {
        top: '12%',
        bottom: '10%'
    },
    legend: {
        x: 'center',
        data: ['早高峰（7点-9点）', '晚高峰（17点-19点）'],
        textStyle: {
            color: '#ccc'
        }
    },

    tooltip: {
        backgroundColor: '#222',

        textStyle: {
            color: '#ccc'
        },
    },
    xAxis: {
        data: xAxisData,
        splitLine: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: '#ccc'
            }
        }
    },
    yAxis: {
        axisLine: {
            lineStyle: {
                color: '#ccc'
            }
        }
    },
    series: [{
        name: '早高峰（7点-9点）',
        type: 'bar',
        data: data1,
        emphasis: {
            focus: 'series'
        },
        animationDelay: function (idx) {
            return idx * 10;
        }
    }, {
        name: '晚高峰（17点-19点）',
        type: 'bar',
        data: data2,
        emphasis: {
            focus: 'series'
        },
        animationDelay: function (idx) {
            return idx * 10 + 100;
        }
    }],
    animationEasing: 'elasticOut',
    animationDelayUpdate: function (idx) {
        return idx * 5;
    }
};
$.ajax({
    url: 'static/data/ear_peak.json',
    dataType: 'json'
}).done(function (data) {
    for (var i = 0; data[i].date != "2020-4-1"; i++) {
        xAxisData.push(data[i].date);
        data1.push(data[i].early);
        data2.push(data[i].evening);
    }

    peak.setOption({
        xAxis: {
            data: xAxisData
        },
        series: [{
            data: data1
        }, {
            data: data2
        }]
    })
})
$('#radio1-1').click(function () {
    $.ajax({
        url: 'static/data/ear_peak.json',
        dataType: 'json'
    }).done(function (data) {
        xAxisData = [];
        data1 = [];
        data2 = [];
        for (var i = 0; data[i].date != "2020-4-1"; i++) {
            xAxisData.push(data[i].date);
            data1.push(data[i].early);
            data2.push(data[i].evening);
        }

        peak.setOption({
            xAxis: {
                data: xAxisData
            },
            series: [{
                data: data1
            }, {
                data: data2
            }]
        })
    })
})
$('#radio1-2').click(function () {
    $.ajax({
        url: 'static/data/ear_peak.json',
        dataType: 'json'
    }).done(function (data) {
        xAxisData = [];
        data1 = [];
        data2 = [];
        for (var i = 91; i < data.length; i++) {
            xAxisData.push(data[i].date);
            data1.push(data[i].early);
            data2.push(data[i].evening);
        }
        peak.setOption({
            xAxis: {
                data: xAxisData
            },
            series: [{
                data: data1
            }, {
                data: data2
            }]
        })
    })
})

if (option && typeof option === 'object') {
    peak.setOption(option);
}