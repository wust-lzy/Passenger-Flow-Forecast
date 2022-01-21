import os

from flask import Flask, render_template
from flask_assets import Environment, Bundle
from flask_compress import Compress

from export import MyModel

app = Flask(__name__)
Compress(app)
assets = Environment(app)
app.secret_key = os.getenv('SECRET_KEY', 'secret string')
app.jinja_env.trim_blocks = True
app.jinja_env.lstrip_blocks = True

js_index = Bundle(
    'js/main/time.js',
    'js/jquery.min.js',
    'js/bootstrap.min.js',
    'js/flexible.js',
    'js/echarts.min.js',
    'js/main/calculate.js',
    'js/main/mouth.js',
    'js/main/weekday.js',
    'js/main/age.js',
    'js/main/top.js',
    'js/main/section.js',
    'js/main/od.js',
    'js/main/peak.js',
    filters='jsmin',
    output='assets/js_index.js'
)

css_index = Bundle(
    'css/min-height.css',
    'css/index.css',
    'css/styles.css',
    'css/loader.css',
    'css/modal.css',
    filters='cssmin',
    output='assets/css_index.css'
)

assets.register('js_index', js_index)
assets.register('css_index', css_index)


def pre_station(date, station, temperature, weather):
    pre = MyModel(date=date, text_day=120, station=station, all=True, tem=temperature, wea_sta=weather)
    return pre.pre_station()


def pre_route(date, route, temperature, weather):
    pre = MyModel(date=date, text_day=90, route=route, tem=temperature, wea_sta=weather)
    return pre.pre_route()


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/predict/<select>/<pre_time>/<name>/<temperature>/<weather>')
def predict(select, pre_time, name, temperature, weather):
    print(select, pre_time, name, temperature, weather)
    if select == 'station':
        data = pre_station(pre_time, name, int(temperature), weather)
        return '{}'.format(int(data))
    elif select == 'route':
        data = pre_route(pre_time, name, int(temperature), weather)
        return '{}'.format(int(data))
