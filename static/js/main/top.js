var single = echarts.init(document.querySelector(".bar3 .chart"))
option = {
    color: ['#070093', '#1c3fbf', '#1482e5', '#70b4eb', '#b4e0f3', '#d0d4f9', '#e1e1e1'],
    tooltip: {
        backgroundColor: '#222',

        textStyle: {
            color: '#ccc'
        },
        trigger: 'item',
        axisPointer: { // Use axis to trigger tooltip
            type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
        }
    },
    legend: {
        x: 'right',
        textStyle: {
            color: '#ccc'
        },
        //data: ['2020.1', '2020.2', '2020.3', '2020.4', '2020.5', '2020.6', '2020.7']
        //data: ['Direct', 'Mail Ad', 'Affiliate Ad', 'Video Ad', 'Search Engine']
    },

    grid: {
        top: '9%',
        left: '3%',
        right: '4%',
        bottom: '10%',
        containLabel: true
    },
    xAxis: {
        axisLabel: {
            color: '#ccc'
        },
        type: 'value'
    },
    yAxis: {
        axisLabel: {
            color: '#ccc'
        },
        type: 'category'
        // data: ['Sta107', 'Sta20', 'Sta129', 'Sta30', 'Sta108', 'Sta134', 'Sta115', 'Sta89', 'Sta63', 'Sta126']
    },
    animationEasing: 'elasticOut',
    animationDelayUpdate: function (idx) {
        return idx * 100;
    }
};
$.ajax({
    url: 'static/data/c_in.json',
    dataType: 'json',
    cache: 'json'
}).done(function (data) {
    station_data = data[0]
    legend_data = []
    series_data = []
    // for (let key in data[0]) {
    //     legend_data.push(key)
    // }
    for (key in data[1]) {
        legend_data.push(key)
        series_data.push({
            name: key,
            type: 'bar',
            stack: 'total',
            label: {
                show: true
            },
            barWidth: 16,
            emphasis: {
                focus: 'series'
            },
            data: data[1][key],
            label: {
                color: 'rgba(255,255,255,0.7)',
                show: true,
                position: 'top',
            },
            animationDelay: function (idx) {
                return idx * 300;
            }
        })
    }
    single.setOption({
        legend: {
            data: legend_data
        },
        yAxis: {
            data: station_data,
            inverse: true
        },
        series: series_data
    })
})
$('#radio2-1').click(function () {
    $.ajax({
        url: 'static/data/c_in.json',
        dataType: 'json',
        cache: 'json'
    }).done(function (data) {
        var station_data = data[0]
        var legend_data = []
        var series_data = []

        for (key in data[1]

            ) {
            legend_data.push(key)
            series_data.push({
                name: key,
                type: 'bar',
                stack: 'total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: data[1][key],
                label: {
                    color: 'rgba(255,255,255,0.7)',
                    show: true,
                    position: 'top',
                },
                animationDelay: function (idx) {
                    return idx * 300;
                }
            })
        }
        single.setOption({
            legend: {
                data: legend_data
            },
            yAxis: {
                data: station_data,
                inverse: true
            },
            series: series_data
        })
    })
})
$('#radio2-2').click(function () {
    $.ajax({
        url: 'static/data/c_out.json',
        dataType: 'json',
        cache: 'json'
    }).done(function (data) {
        var station_data = data[0]
        var legend_data = []
        var series_data = []

        for (key in data[1]

            ) {
            legend_data.push(key)
            series_data.push({
                name: key,
                type: 'bar',
                stack: 'total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: data[1][key],
                label: {
                    color: 'rgba(255,255,255,0.7)',
                    show: true,
                    position: 'top',
                },
                animationDelay: function (idx) {
                    return idx * 300;
                }
            })
        }
        single.setOption({
            legend: {
                data: legend_data
            },
            yAxis: {
                data: station_data,
                inverse: true
            },
            series: series_data
        })
    })
})
if (option && typeof option === 'object') {
    single.setOption(option);
}