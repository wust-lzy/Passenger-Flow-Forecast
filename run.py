import os
import requests

data = ['a9/2020.json', 'a9/city.json', 'a9/route_flow.json', 'a9/station_flow.json', 'init/clean_data.json',
        'init/test_station.json', 'init/users.json', 'init/workdays2020.json']


def get_all_name():
    data_dirs = ['a9', 'init']
    result = []
    for dir_item in data_dirs:
        for root, dirs, files in os.walk(dir_item):
            for file in files:
                result.append('{}/{}'.format(dir_item, file))
    print(result)


if not os.path.exists('a9'):
    os.mkdir('a9')

if not os.path.exists('init'):
    os.mkdir('init')

print(os.path.exists(data[0]))

for item in data:
    if not os.path.exists(item):
        print('开始下载 {}'.format(item))
        with open(item, mode='wb') as f:
            f.write(requests.get('http://114.55.125.234:1111/{}'.format(item)).content)
        print('下载成功 {}'.format(item))

print('Success')
# get_all_name()
