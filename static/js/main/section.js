var chartDom = document.querySelector(".line2 .chart");
var myChart = echarts.init(chartDom);
var in_data = []
var out_data = []
var x_data = []
var res
var line_name = ["1\u53f7\u7ebf", "2\u53f7\u7ebf", "3\u53f7\u7ebf", "4\u53f7\u7ebf", "5\u53f7\u7ebf", "10\u53f7\u7ebf", "11\u53f7\u7ebf", "12\u53f7\u7ebf"]
option = {
    tooltip: {
        backgroundColor: '#222',
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        },
        textStyle: {
            color: '#ccc'
        },
        formatter: (params) => {
            if (!params.length) return ''
            let s = params[0].axisValueLabel + '<br/>'
            for (const iterator of params) {
                let d = iterator.data < 0 ? -iterator.data : iterator.data
                s += iterator.marker + iterator.seriesName + '：' + d + '<br/>'
            }
            return s
        }
    },
    legend: {
        x: 'right',
        data: ['进站', '出站'],
        textStyle: {
            color: '#ccc'
        },
    },
    grid: {
        top: '13%',
        left: '3%',
        right: '4%',
        bottom: '0%',
        containLabel: true
    },
    yAxis: [{
        axisLine: {
            lineStyle: {
                color: '#ccc'
            }
        },
        axisLabel: {
            formatter: (value) => {
                // 负数取反 显示的就是正数了
                if (value < 0) return -value
                else return value
            }
        },
        type: 'value',
    }
    ],
    xAxis: [{
        axisLine: {
            lineStyle: {
                color: '#ccc'
            }
        },
        type: 'category',
        axisTick: {
            show: false
        },
        axisLabel: {
            rotate: -68
        }
        // data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    }],
    series: [
        {
            name: '进站',
            type: 'bar',
            stack: '总量',
            label: {
                show: false,
                // position: 'top'
            },
            emphasis: {
                focus: 'series'
            },
            // data: [320, 302, 341, 374, 390, 450, 420]
        },
        {
            name: '出站',
            type: 'bar',
            stack: '总量',
            label: {
                show: false,
                // position: 'bottom'
            },
            emphasis: {
                focus: 'series'
            },
            // data: [-120, -132, -101, -134, -190, -230, -210]
        }
    ]
};
$.ajax({
    url: 'static/data/line_section.json',
    dataType: 'json'
}).done(function (data) {
    res = data
    $('#select').trigger('change');
})

$('#select').on('change', function () {
    var val = $(this).val()
    x_data = res[line_name[val - 1]][0]
    in_data = res[line_name[val - 1]][1]
    for (let i = 0; i < res[line_name[val - 1]][2].length; ++i) {
        out_data.push(res[line_name[val - 1]][2][i] * -1)
    }
    myChart.setOption({
        xAxis: {
            data: x_data,
        },
        series: [{
            data: in_data
        }, {
            data: out_data
        }
        ]
    })
});

if (option && typeof option === 'object') {
    myChart.setOption(option);
}