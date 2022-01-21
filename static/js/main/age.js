var dom = document.querySelector(".pie .chart");
var age = echarts.init(dom);
var app = {};

var option;


option = {
    title: {
        // textStyle: {
        //     color: '#fff'
        // },
        // text: '用户年龄结构分析'
        show: false
    },
    grid: {
        top: '2%',
        bottom: '15%'
    },
    tooltip: {
        backgroundColor: '#222',
        trigger: 'item',
        formatter: '{b}<br/>人数：{c}<br/>占比：{d}%',
        textStyle: {
            color: '#ccc'
        }
    },
    label: {
        show: true,
        color: "#ccc",//"rgba(255,255,255,.6)",
        formatter: '{b} ({d}%)'
    },
    legend: {
        textStyle: {
            color: "#ccc",
            fontSize: "12"
        },
        x: 'center',
        y: 'bottom',
        // orient: 'vertical',
        itemWidth: 10,
        itemHeight: 10
    },
    series: [{

        // color: ['#1482e5', '#70b4eb', '#18cbd3', '#070093', '#e1e1e1'],
        color: [
            "#006cff",
            "#ff9f7f",
            "#d0d4f9",
            "#64d1df",
            "#e1e1e1",
            "#9fe6b8",
            "#32c5e9",
            "#1d9dff"
        ],
        name: '用户年龄结构分布',
        type: 'pie',
        radius: ['30%', '65%'],
        center: ['45%', '45%'],
        emphasis: {
            itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        }
    }]
};
$.ajax({
    url: 'static/data/d.json',
    dataType: 'json'
}).done(function (data) {
    let chart_data = []
    for (item in data) {
        chart_data.push({
            'name': item,
            'value': data[item]
        })
    }
    age.setOption({
        series: {
            data: chart_data
        }
    })
})

if (option && typeof option === 'object') {
    age.setOption(option);
}