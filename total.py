import json
import os

import pandas as pd
import datetime as dt

path = ''
for root, dirs, files in os.walk('a9'):
    if len(files) > 0:
        path = 'init/'
    else:
        path = 'http://114.55.125.234:1111/init/'
trips = pd.read_json(os.path.join(path, 'clean_data.json'), encoding='gbk')  # 读取
user = pd.read_json(os.path.join(path, 'users.json'), encoding='gbk')

days = pd.read_json(os.path.join(path, 'workdays2020.json'), encoding='gbk')
days.columns = ['date', 'type']
days['date'] = pd.to_datetime(days['date'], format='%Y%m%d')

station_path = os.path.join(path, 'test_station.json')
station = pd.read_json(station_path, encoding='gbk')


def my_write(data, name):
    """
    将数据写成json格式
    :param data: 数据
    :param name: 文件名
    :return:
    """
    with open(os.path.join(os.path.join('static', 'data'), name), mode='w', encoding='utf-8') as f:
        f.write(json.dumps(data, sort_keys=True, indent=4, separators=(',', ': '),
                           ensure_ascii=False))


def line_group():
    stations = station.copy()
    route_list = stations['line_name'].unique()
    return route_list  # 返回线路表


def station_group():
    stations = station.copy()
    station_list = stations['station_name'].unique()
    return station_list  # 返回线路表


def count_bymonth():  # 统计单月客流
    entertime = pd.to_datetime(trips['in_time']).to_frame()  # 转换为时间
    data_month1 = entertime.groupby(
        [entertime['in_time'].dt.year.rename('year'), entertime['in_time'].dt.month.rename('month')],
        as_index=False).size()  # 按年和月分组

    data_month1 = data_month1[data_month1['year'] == 2020]
    ans = data_month1['size'].tolist()
    date = []
    for y, m in zip(data_month1['year'], data_month1['month']):
        date.append((str(y) + '-' + str(m)))

    my_write({'counts': ans, 'date': date}, 'a.json')
    # return date, ans


def weekdays_or_weekends_flow():
    trip = trips.copy()
    trip.rename(columns={'in_time': 'date'}, inplace=True)
    trips_date = trip['date'].astype(str).str[0:10]
    trips_date = pd.to_datetime(trips_date)
    ans1 = []
    ans2 = []
    for i in range(7):
        temp = pd.merge(trips_date, days, on='date')
        temp = temp[temp['date'].dt.month == (i + 1)]
        ans = temp.groupby([temp['type'], temp['date'].dt.day], as_index=False).size()

        temp1 = ans.loc[ans['type'] == 1]
        temp2 = ans.loc[ans['type'] == 2]
        x = temp1['size'].tolist();
        y = temp2['size'].tolist();
        ans1.append(int(sum(x) / len(x)))
        ans2.append(int(sum(y) / len(y)))
    my_write({'workday': ans2, 'weekday': ans1}, 'b.json')
    # return ans1, ans2


def inflow_allyear():  # 入站客流 top10
    trips_data = trips.copy()
    trips_data['year'] = pd.to_datetime(trips_data['in_time']).dt.year
    trips_data['month'] = pd.to_datetime(trips_data['in_time']).dt.month
    trips_data = trips_data.loc[trips_data['year'] == 2020]
    count_data = trips_data.groupby(['in_name'], as_index=False).size()
    count_data = count_data.sort_values(by='size', ascending=False)
    top_list = count_data.iloc[0:10, 0].tolist()
    result = [[]] * 10
    for i in range(len(top_list)):
        trips_temp = trips_data.loc[trips_data['in_name'] == top_list[i]]
        ans = trips_temp.groupby(['month'], as_index=False).size()
        list1 = ans['month'].tolist()
        list2 = ans['size'].tolist()
        if 2 not in list1:
            list1.insert(1, 2)
            list2.insert(1, 0)
        result[i] = list2
    ans = {}
    temp2 = [[]] * 7
    for i in range(7):
        temp = []
        for j in range(10):
            temp.append(result[j][i])
        temp2[i] = temp
    for i in range(7):
        ans['2020-' + str(i + 1)] = temp2[i]
    my_write([top_list, ans], 'c_in.json')
    # return top_list, ans


def outflow_allyear():  # 出站客流 top10
    trips_data = trips.copy()
    trips_data['year'] = pd.to_datetime(trips_data['out_time']).dt.year
    trips_data['month'] = pd.to_datetime(trips_data['out_time']).dt.month
    trips_data = trips_data.loc[trips_data['year'] == 2020]
    count_data = trips_data.groupby(['out_name'], as_index=False).size()
    count_data = count_data.sort_values(by='size', ascending=False)
    top_list = count_data.iloc[0:10, 0].tolist()
    result = [[]] * 10
    for i in range(len(top_list)):
        trips_temp = trips_data.loc[trips_data['out_name'] == top_list[i]]
        ans = trips_temp.groupby(['month'], as_index=False).size()
        list1 = ans['month'].tolist()
        list2 = ans['size'].tolist()
        if 2 not in list1:
            list1.insert(1, 2)
            list2.insert(1, 0)
        result[i] = list2
    ans = {}
    temp2 = [[]] * 7
    for i in range(7):
        temp = []
        for j in range(10):
            temp.append(result[j][i])
        temp2[i] = temp
    for i in range(7):
        ans['2020-' + str(i + 1)] = temp2[i]
    my_write([top_list, ans], 'c_out.json')
    # return top_list, ans


def old():  # 乘客年龄结构
    user_data = user.copy()
    user_data['age'] = dt.datetime.today().year - user_data['出生年份']
    age_0_count = len(user_data.loc[user_data.age < 20])
    age_20_count = len(user_data.loc[(user_data.age < 30) & (user_data.age >= 20)])
    age_30_count = len(user_data.loc[(user_data.age < 40) & (user_data.age >= 30)])
    age_40_count = len(user_data.loc[(user_data.age < 60) & (user_data.age >= 40)])
    age_60_count = len(user_data.loc[user_data.age >= 60])
    ans = ['20岁以下', '20~30岁', '30~40岁', '40~60岁', '60岁以上']
    ans2 = [age_0_count, age_20_count, age_30_count, age_40_count, age_60_count]
    result = dict(zip(ans, ans2))

    my_write(result, 'd.json')
    # return result


def peak_flow():
    trips_data = trips.copy()
    trips_data['in_time'] = pd.to_datetime(trips_data['in_time'])
    trips_data['year'] = pd.to_datetime(trips_data['in_time']).dt.year
    trips_data['month'] = pd.to_datetime(trips_data['in_time']).dt.month
    trips_data['day'] = pd.to_datetime(trips_data['in_time']).dt.day
    trips_data['hour'] = trips_data['in_time'].dt.hour
    trips_data = trips_data.loc[trips_data['year'] == 2020]
    early = trips_data.loc[(trips_data['hour'] >= 7) & (trips_data['hour'] <= 9)]  # 根据站统计
    evening = trips_data.loc[(trips_data['hour'] >= 17) & (trips_data['hour'] <= 19)]
    ans1 = early.groupby(['month', 'day'], as_index=False).size()
    ans2 = evening.groupby(['month', 'day'], as_index=False).size()
    ans1['size2'] = ans2['size']
    ans = []
    for a, b in ans1.iterrows():
        temp = {
            'date': "2020-{}-{}".format(b['month'].astype(str), b['day'].astype(str)),
            'early': b['size'].astype(str),
            'evening': b['size2'].astype(str)
        }
        ans.append(temp)
    my_write(ans, 'ear_peak.json')
    # return ans


def _od():
    trip = trips.copy()
    link = trip.groupby(['in_name', 'out_name']).size().reset_index(name='客流量')
    dic = []
    for name, i in link.iterrows():
        di = {'source': "{}_0".format(i['in_name']),
              'target': "{}_1".format(i['out_name']),
              'value': i['客流量'],
              }
        dic.append(di)
    # with open('data111.json', 'w') as f:
    #     f.write(json.dumps(dic))

    return dic


def od2():
    lines = station.copy()
    lines.drop(columns=['id', 'district', 'sequence'], inplace=True)
    in_station = lines.copy()
    out_station = lines.copy()
    in_station.columns = ['in_name', 'in_line']
    out_station.columns = ['out_name', 'out_line']
    trip_data = trips.copy()
    trip_data = pd.merge(trip_data, in_station, on='in_name', how='left')
    trip_data = pd.merge(trip_data, out_station, on='out_name', how='left')
    link = trip_data.groupby(['in_line', 'out_line'], as_index=False).size()
    dic = []
    for name, i in link.iterrows():
        di = {'source': "{}_上行".format(i['in_line']),
              'target': "{}_下行".format(i['out_line']),
              'value': i['size'],
              }
        dic.append(di)

    my_write(dic, 'line-to-line_od.json')

    # return dic


def line_section_flow():
    data = trips.copy()
    station_data = station.copy()
    station_in = data.groupby('in_name')['price'].count().reset_index(name='in_count')
    station_out = data.groupby('out_name')['price'].count().reset_index(name='out_count')
    station_in_and_out = pd.merge(station_in, station_out, left_on='in_name', right_on='out_name')
    line_station = station_data.groupby(['line_name', 'station_name'])['id'].count().reset_index(name='id')
    result = {}
    for line in line_station['line_name'].unique():
        result[line] = []
        line_sta = [s for s in line_station.loc[line_station['line_name'] == line]['station_name']]
        result[line].append(line_sta)
        in_count = [in_c for sta in line_sta for in_c in
                    station_in_and_out.loc[station_in_and_out['in_name'] == sta]['in_count']]
        result[line].append(in_count)
        out_count = [out_c for sta in line_sta for out_c in
                     station_in_and_out.loc[station_in_and_out['out_name'] == sta]['out_count']]
        result[line].append(out_count)
    my_write(result, 'line_section.json')
    # return result


# print(line_group())
# print(station_group())

# 以下全部直接返回json数据

def initData():
    count_bymonth()  # a-单月统计
    weekdays_or_weekends_flow()  # b-工作日和周末
    inflow_allyear()  # c_in入站top10
    outflow_allyear()  # c_out出站top10

    old()  # d 年龄结构2
    peak_flow()  # e 早晚高峰
    od2()  # f 线路to线路客流
    line_section_flow()  # g  线路断面客流
