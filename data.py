import filecmp
import json
import os
import sys
import shutil
from flask_sqlalchemy import SQLAlchemy

from flask import Flask

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://admin:root@114.55.125.234:3306/passenger"
# app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://root:root@localhost:3306/test"
# app.config['SQLALCHEMY_BINDS'] = {
#     'db_2': 'mysql+pymysql://root:root@localhost:3306/db_2',
#     'test': 'mysql+pymysql://root:root@localhost:3306/test'
# }
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# DB_CACHE = '../Passenger-Flow-Forecast/db_cache'

DB_CACHE = 'db_cache'


def removeSame(name):
    """
    首先移除所有包含name的空文件，然后在剩余文件中选择时间最近的文件
    :param name: 部分文件名
    :return: 无返回值
    """
    path = os.path.join(sys.path[0], DB_CACHE)
    files_list = []
    last_time = '0000_00_00_00_00_00'
    for root, dirs, files in os.walk(path):
        for file in files:
            if file.find(name) != -1:
                if os.path.getsize(os.path.join(root, file)) == 0:
                    os.remove(os.path.join(root, file))
                    continue
                files_list.append(file)
                file_time = file[:19]
                if file_time > last_time:
                    last_time = file_time
    flag = True
    for i in range(len(files_list)):
        for j in range(len(files_list) - 1):
            j = j + 1
            if not filecmp.cmp(os.path.join(sys.path[0], DB_CACHE, files_list[i]),
                               os.path.join(sys.path[0], DB_CACHE, files_list[j])):
                flag = False
                break
        file = files_list[i]
        if file.find(last_time) == -1 and os.path.exists(os.path.join(path, file)):
            os.remove(os.path.join(path, file))
    return flag


def readDB():
    db = SQLAlchemy(app)
    db.reflect()
    all_table = {table_obj.name: table_obj for table_obj in db.get_tables_for_bind()}
    db_tables = list(all_table.keys())
    flag = True
    for name in db_tables:
        print(name)
        # now_time = time.strftime("%Y_%m_%d_%H_%M_%S")
        data = [dict(zip(result.keys(), result)) for result in db.session.query(all_table[name]).all()]
        print(db.session.query(all_table[name]).all())
        # data = json.dumps(data, sort_keys=True, indent=4, separators=(',', ': '), ensure_ascii=False)
        with open(os.path.join(sys.path[0], DB_CACHE, '{}.json'.format(name)), mode='w') as f:
            f.write(json.dumps(data))
    return flag


def updateDBData():
    # 文件夹名为 a9，init
    # 文件名为 a9_xxx，init_xxx
    readDB()
    for root, dirs, files in os.walk(DB_CACHE):
        for file in files:
            dir_file = file[:file.find('_')]
            print(dir_file, file)
            shutil.move(os.path.join(DB_CACHE, file), os.path.join(dir_file, file.replace('{}_'.format(dir_file), '')))
            print(os.path.join(DB_CACHE, file), os.path.join(dir_file, file.replace('{}_'.format(dir_file), '')))


updateDBData()
