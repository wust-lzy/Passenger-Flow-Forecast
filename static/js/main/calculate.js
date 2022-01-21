station = document.getElementById('station')
station.innerHTML = ''
$.getJSON('/static/data/station_list.json', function (data) {
    for (let i in data) {
        station.innerHTML += '<option value="' + data[i] + '">' + data[i] + '</option>'
    }
})
route = document.getElementById('route')
route.innerHTML = ''
$.getJSON('/static/data/route_list.json', function (data) {
    for (let i in data) {
        route.innerHTML += '<option value="' + data[i] + '">' + data[i] + '</option>'
    }
})
weather = document.getElementById('weather')
weather.innerHTML = ''
$.getJSON('/static/data/weather.json', function (data) {
    for (let i in data) {
        weather.innerHTML += '<option value="' + data[i] + '">' + data[i] + '</option>'
    }
})
predict_station_button = document.getElementById('predict_station_button')
predict_station_button.onclick = function () {
    predict_station_data = document.getElementById('station_data')
    predict_station_data.innerHTML = '<div style="font-size: 18px">正在计算中...</div><div class="chart-loader"><div class="loader"></div></div>'
    time_value = document.getElementById('predict_time').value
    station_value = document.getElementById('station').value
    temperature_value = document.getElementById('temperature').value
    weather_value = document.getElementById('weather').value
    $.ajax({
        url: '/predict/station/' + time_value + '/' + station_value + '/' + temperature_value + '/' + weather_value
    }).done(function (data) {
        predict_station_data.innerHTML = data
    })
}
predict_route_button = document.getElementById('predict_route_button')
predict_route_button.onclick = function () {
    predict_data = document.getElementById('route_data')
    predict_data.innerHTML = '<div style="font-size: 18px">正在计算中...</div><div class=\"chart-loader\"><div class=\"loader\"></div></div>'
    time_value = document.getElementById('predict_time').value
    route_value = document.getElementById('route').value
    $.ajax({
        url: '/predict/route/' + time_value + '/' + route_value + '/' + temperature_value + '/' + weather_value
    }).done(function (data) {
        predict_data.innerHTML = data
    })
}