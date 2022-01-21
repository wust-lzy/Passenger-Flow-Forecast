var workday = echarts.init(document.querySelector(".bar2 .chart"));
var option = {
    color: ['#516cc0', '#18cbd3'],
    // backgroundColor: 'rgb(16, 12, 42)',
    title: {
        // textStyle: {
        //     color: '#fff'
        // },
        // text: '工作日和周末的客流分析'
        show: false
    },
    tooltip: {
        backgroundColor: '#222',
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        },
        formatter: '{b}' + '</br>' + '工作日平均客流量:' + '{c0}' + '</br>' + '周末平均客流量:' + '{c1}',
        textStyle: {
            color: '#ccc'
        },
    },
    legend: {
        x: 'right',
        data: ['工作日', '周末'],
        textStyle: {
            color: '#ccc'
        }
    },
    grid: {
        top: "20%",
        left: "12%",
        bottom: "10%"
        // containLabel: true
    },
    yAxis: {
        axisLine: {
            lineStyle: {
                color: '#ccc'
            }
        },
        type: 'value',
        boundaryGap: [0, 0.01]
    },
    xAxis: {
        axisLine: {
            lineStyle: {
                color: '#ccc'
            }
        },
        type: 'category',
        data: ['2020-1', '2020-2', '2020-3', '2020-4', '2020-5', '2020-6', '2020-7']
    },
    series: [{
        name: '工作日',
        type: 'bar',
        data: [18203, 23489, 29034, 104970, 131744, 63023, 42313]
    },
        {
            name: '周末',
            type: 'bar',
            data: [19325, 23438, 31000, 121594, 134141, 68180, 54334]
        }
    ]
};
$.ajax({
    url: 'static/data/b.json',
    dataType: 'json',
    cache: false
}).done(function (data) {
    workday.setOption({
        series: [{
            data: data.workday
        },
            {
                data: data.weekday
            }
        ]
    })
})
if (option && typeof option === 'object') {
    workday.setOption(option);
}