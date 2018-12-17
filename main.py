#!/usr/bin/env python
# -*- coding: utf-8 -*- 
import time, requests, random, json
from datetime import datetime, timedelta
from sqlalchemy import Column, String, Float, Integer, DATETIME, and_
#from sqlalchemy.orm import sessionmaker
#from sqlalchemy.ext.declarative import declarative_base
from flask import Flask, jsonify, render_template, request, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_socketio import SocketIO, emit
#from create_DB import Dog
import json
from sqlalchemy.dialects.mysql import DOUBLE
import DAI
from flask_httpauth import HTTPBasicAuth

app = Flask(__name__)
# 設定資料庫位置，並建立 app
#path為3條線///
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://map:pcs54784@localhost/map?charset=utf8'
#由於SQLALCHEMY_TRACK_MODIFICATIONS預設為None, 因此我們須給True or False
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
socketio = SocketIO(app)

db = SQLAlchemy(app)

auth = HTTPBasicAuth()

users = {
    "iottalk": "iot2019"
}

# 创建对象的基类:
# Base = declarative_base()

class fixed_Marker(db.Model):
    # 表的名字:
    __tablename__ = 'marker'

    # 表的结构:
    id = Column(Integer, primary_key=True)
    lat = Column(DOUBLE)
    lon = Column(DOUBLE)
    type = Column(String(20))
    content = Column(String(500))

    __table_args__ = {'sqlite_autoincrement': True}


class icon_define_table(db.Model):
    # 表的名字:
    __tablename__ = 'icon_define_table'

    # 表的结构:
    number = Column(Integer, primary_key=True)
    app = Column(String(100))
    kind = Column(Integer)
    mobility = Column(String(100))
    icon = Column(String(100))
    picture = Column(String(500))
    visual = Column(String(100))
    color_min = Column(Integer)
    color_max = Column(Integer)
    quick_access = Column(Integer)

    __table_args__ = {'sqlite_autoincrement': True}


class static_icon_table(db.Model):
    # 表的名字:
    __tablename__ = 'static_icon_table'

    # 表的结构:
    number = Column(Integer, primary_key=True)
    app_num = Column(Integer)
    name = Column(String(100))
    lat = Column(DOUBLE)
    lng = Column(DOUBLE)
    description = Column(String(500))

    __table_args__ = {'sqlite_autoincrement': True}


# 定义User对象:
class data_pull_from_iottalk(db.Model):
    # 表的名字:
    __tablename__ = 'data_pull_from_iottalk'

    # 表的结构:
    number = Column(Integer, primary_key=True)
    app_num = Column(Integer)
    lat = Column(DOUBLE)
    lng = Column(DOUBLE)
    name = Column(String(100))#Column(Integer)
    value = Column(String(500))
    time = Column(DATETIME)
    __table_args__ = {'sqlite_autoincrement': True}


class iottalk_data_latest_record(db.Model):
    # 表的名字:
    __tablename__ = 'iottalk_data_latest_record'

    # 表的结构:
    id = Column(Integer, primary_key=True)
    app_num = Column(Integer)
    lat = Column(DOUBLE)
    lng = Column(DOUBLE)
    name = Column(String(100))
    value = Column(String(500))
    time = Column(DATETIME)
    __table_args__ = {'sqlite_autoincrement': True}
    
    '''
    def __init__(self, content):
        self.content = content
    '''


# 初始化数据库连接:
#engine = create_engine('sqlite:///Dog.db', echo=True)
# 創建表（如果表已經存在，則不會創建）
db.create_all()


# 创建DBSession类型:
#DBSession = sessionmaker(bind=engine)

@auth.get_password
def get_pw(username):
    if username in users:
        return users.get(username)
    return None

@app.route('/secure/_take_all_iottalk_data')
def take_all_iottalk_data():
    all_iottalk_data_list = []

    c = db.session.query(iottalk_data_latest_record).all()

    for row in c:
        all_iottalk_data_list.append({
            'app_num': row.app_num,
            'name': row.name,
            'lat': float(row.lat),
            'lng': float(row.lng),
            'value': row.value
        })

    '''slow version
    c = db.session.query(icon_define_table.number).all()
    # print(c)
    for row in c:
        # print("main c: " + str(row.number))
        e = db.session.query(data_pull_from_iottalk.name).filter(data_pull_from_iottalk.app_num == row.number).distinct()
        for row2 in e:
            # print("main e: " + str(row2.name))
            d = db.session.query(data_pull_from_iottalk).filter(and_(data_pull_from_iottalk.app_num == row.number, data_pull_from_iottalk.name == row2.name)).order_by(data_pull_from_iottalk.number.desc()).first()
            all_iottalk_data_list.append({
                'app_num': d.app_num,
                'name': d.name,
                'lat': d.lat,
                'lng': d.lng,
                'value': d.value
            })
            new_data = iottalk_data_latest_record(app_num=d.app_num, name=d.name, lat=d.lat, lng=d.lng, value=d.value, time=d.time)
            db.session.add(new_data)
            db.session.commit()
            # print(str(row2.name) + ":" + str(d.app_num))
    '''
    return jsonify(result = all_iottalk_data_list)

@app.route('/secure/_set_tracking_id')
def set_tracking_id():
    app = request.args.get('app', type=str)
    name = request.args.get('name', type=str)

    app_num = db.session.query(icon_define_table).filter(icon_define_table.app == app).first().number

    tracking_target = db.session.query(iottalk_data_latest_record).filter(and_(iottalk_data_latest_record.app_num == app_num, iottalk_data_latest_record.name == name)).first()

    if tracking_target == None:
        tracking_target = db.session.query(iottalk_data_latest_record).filter(iottalk_data_latest_record.app_num == app_num)
        max_tracking_target = -1
        for c in tracking_target:
            if int(c.value) > max_tracking_target:
                max_tracking_target = int(c.value)
        tracking_target.value = max_tracking_target + 1
    print(tracking_target.value)
    
    tracking_list_with_id = []
    
    tracking_list_with_id.append({
        'app_num': app_num,
        'id': tracking_target.value
    })

    return jsonify(result = tracking_list_with_id)

@app.route('/secure/_del_movable_icon')
def del_movable_icon():

    app_num = request.args.get('app_num', type=int)
    name = request.args.get('name', type=str)

    db.session.query(data_pull_from_iottalk).filter(and_(data_pull_from_iottalk.app_num == app_num, data_pull_from_iottalk.name == name)).delete()
    db.session.commit()

    db.session.query(iottalk_data_latest_record).filter(and_(iottalk_data_latest_record.app_num == app_num, iottalk_data_latest_record.name == name)).delete()
    db.session.commit()

    db.session.query(static_icon_table).filter(and_(static_icon_table.app_num == app_num, static_icon_table.name == name)).delete()
    db.session.commit()

    return jsonify(result = True)

@app.route('/secure/_del_static_icon')
def del_static_icon():

    number = request.args.get('number', 0, type=int)

    static_icon = db.session.query(static_icon_table).filter(static_icon_table.number == number).first()

    db.session.query(data_pull_from_iottalk).filter(and_(data_pull_from_iottalk.app_num == static_icon.app_num, data_pull_from_iottalk.name == static_icon.name)).delete()
    db.session.commit()

    db.session.query(iottalk_data_latest_record).filter(and_(iottalk_data_latest_record.app_num == static_icon.app_num, iottalk_data_latest_record.name == static_icon.name)).delete()
    db.session.commit()

    db.session.query(static_icon_table).filter(static_icon_table.number == number).delete()
    db.session.commit()

    return jsonify(result = True)

@app.route('/secure/_modify_static_icon')
def modify_static_icon():
    number = request.args.get('number', 0, type=int)
    # app_num = request.args.get('app_num', type=int)
    name = request.args.get('name', type=str)
    lat = request.args.get('lat', 0, type=float)
    lng = request.args.get('lng', 0, type=float)
    description = request.args.get('description', type=str)

    db.session.query(static_icon_table).filter(static_icon_table.number == number).update(dict(name=name, lat=lat, lng=lng, description=description))
    db.session.commit()

    return jsonify(result = True)

@app.route('/secure/_take_all_static_icon')
def take_all_static_icon():
    c = db.session.query(static_icon_table).all()
    all_static_icon_list = []
    
    for row in c:
        all_static_icon_list.append({
            'number': row.number,
            'app_num': row.app_num,
            'name': row.name,
            'lat': float(row.lat),
            'lng': float(row.lng),
            'description': row.description
        })

    return jsonify(result = all_static_icon_list)

@app.route('/secure/_add_static_icon')
def add_static_icon():
    app_num = request.args.get('app_num', type=int)
    name = request.args.get('name', type=str)
    lat = request.args.get('lat', 0, type=float)
    lng = request.args.get('lng', 0, type=float)
    description = request.args.get('description', type=str)

    new_data = static_icon_table(app_num=app_num, name=name, lat=lat, lng=lng, description=description)
    db.session.add(new_data)
    db.session.commit()

    return jsonify(result = True)


@app.route('/secure/_del_app')
def del_app():
    number = request.args.get('number', 0, type=int)

    db.session.query(icon_define_table).filter(icon_define_table.number == number).delete()
    db.session.commit()

    db.session.query(static_icon_table).filter(static_icon_table.app_num == number).delete()
    db.session.commit()

    db.session.query(data_pull_from_iottalk).filter(data_pull_from_iottalk.app_num == number).delete()
    db.session.commit()  

    db.session.query(iottalk_data_latest_record).filter(iottalk_data_latest_record.app_num == number).delete()
    db.session.commit() 

    DAI.iottalk_device_feature_update()
    return jsonify(result = True)

@app.route('/secure/_modify_app')
def modify_app():
    number = request.args.get('number', type=int)
    app = request.args.get('app', type=str)
    kind = request.args.get('kind', 0, type=int)
    mobility = request.args.get('mobility', type=str)
    icon = request.args.get('icon', type=str)
    picture = request.args.get('picture', type=str)
    visual = request.args.get('visual', type=str)
    color_min = request.args.get('color_min', default=None, type=int)
    color_max = request.args.get('color_max', default=None, type=int)
    quick_access = request.args.get('quick_access', 0, type=float)

    db.session.query(icon_define_table).filter(icon_define_table.number == number).update(dict(app=app, kind=kind, mobility=mobility, icon=icon, picture=picture, visual=visual, color_min=color_min, color_max=color_max, quick_access=quick_access))
    db.session.commit()

    DAI.iottalk_device_feature_update()
    return jsonify(result = True)

@app.route('/secure/_take_all_app')
def take_all_app():
    c = db.session.query(icon_define_table).order_by(icon_define_table.app).all()
    all_app_list = []
    
    for row in c:
        all_app_list.append({
            'number': row.number,
            'app': row.app,
            'kind': row.kind,
            'mobility': row.mobility,
            'icon': row.icon,
            'picture': row.picture,
            'visual': row.visual,
            'color_min': row.color_min,
            'color_max':row.color_max,
            'quick_access': row.quick_access
        })
    return jsonify(result = all_app_list)

@app.route('/secure/_add_app')
def add_app():
    app = request.args.get('app', type=str)
    kind = request.args.get('kind', 0, type=int)
    mobility = request.args.get('mobility', type=str)
    icon = request.args.get('icon', type=str)
    picture = request.args.get('picture', type=str)
    visual = request.args.get('visual', type=str)
    color_min = request.args.get('color_min', default=None, type=int)
    color_max = request.args.get('color_max', default=None, type=int)
    quick_access = request.args.get('quick_access', 0, type=float)

    new_data = icon_define_table(app=app, kind=kind, mobility=mobility, icon=icon, picture=picture, visual=visual, color_min=color_min, color_max=color_max, quick_access=quick_access)
    db.session.add(new_data)
    db.session.commit()

    DAI.iottalk_device_feature_update()
    return jsonify(result = True)

@app.route('/secure/_take_markers')
def take_markers():
    c = db.session.query(fixed_Marker).all()
    recent_histories = []
    
    for row in c:
        recent_histories.append({
            'id': row.id,
            'lat': float(row.lat),
            'lon': float(row.lon),
            'type': row.type,
            'content': row.content,
        })
    return jsonify(result = recent_histories)

@app.route('/secure/_take_obstacles')
def take_obstacles():
    c = db.session.query(icon_define_table).filter_by(app = 'Obstacle').first()
    c = db.session.query(static_icon_table).filter_by(app_num = c.number).all()

    recent_histories = []
    
    for row in c:
        recent_histories.append({
            'lat': float(row.lat),
            'lon': float(row.lng),
        })
    return jsonify(result = recent_histories)

@app.route('/secure/_take_cameras')
def take_cameras():
    c = db.session.query(fixed_Marker).filter_by(type = 'camera').all()
    recent_histories = []
    
    for row in c:
        recent_histories.append({
            'id': row.id,
            'lat': float(row.lat),
            'lon': row.lon,
            'type': row.type,
            'content': row.content,
        })
    return jsonify(result = recent_histories)

@app.route('/secure/_add_numbers')
def add_numbers():
    print("add_numbers in**********\n")
    lat = request.args.get('lat', 0, type=float)
    lon = request.args.get('lon', 0, type=float)
    dog_id = request.args.get('dog_id', type=str)
    data = request.args.get('data', type=str)
    time = request.args.get('time', type=str)
    time = datetime.strptime(time, "%Y-%m-%d %H:%M:%S.%f")

    emit('server_response', {'data': lat})

    # 创建session对象:
    #session = DBSession()
    # 创建新User对象:
    new_data = Dog(dog_id=dog_id, lat=lat, lon=lon,timestamp=time, data=data)
    # 添加到session:
    db.session.add(new_data)
    # 提交即保存到数据库:
    db.session.commit()
    # 关闭session:
    #session.close()
    
    return jsonify(result = True)

@app.route('/secure/_add_markers')
def add_markers():
    lat = request.args.get('lat', 0, type=float)
    lon = request.args.get('lon', 0, type=float)
    type = request.args.get('type', type=str)
    content = request.args.get('content', type=str)
    # 创建session对象:
    #session = DBSession()
    # 创建新User对象:
    new_data = fixed_Marker(lat=lat, lon=lon, type=type, content=content)
    # 添加到session:
    db.session.add(new_data)
    # 提交即保存到数据库:
    db.session.commit()
    # 关闭session:
    #session.close()
    c = db.session.query(fixed_Marker).order_by(fixed_Marker.id.desc()).first()
    marker_id = c.id
    return jsonify(result = marker_id)

@app.route('/secure/_modify_markers')
def modify_markers():
    id = request.args.get('id', type=float)
    content = request.args.get('content', type=str)
    db.session.query(fixed_Marker).filter(fixed_Marker.id == id).update(dict(content=content))
    # 添加到session:
    #db.session.add(new_data)
    # 提交即保存到数据库:
    db.session.commit()
    # 关闭session:
    #session.close()
    # c = db.session.query(fixed_Marker).order_by(fixed_Marker.id.desc()).first()
    # marker_id = c.id
    return jsonify(result = content)

# @app.route('/secure/_take_active_markers')
# def _take_active_markers():
#     dog_id = request.args.get('dog_id', type=int)
#     c = db.session.query(Dog).filter(Dog.dog_id == dog_id).order_by(Dog.id.desc()).first()
    
#     recent_histories={
#         'id':  c.dog_id,
#         'lat': c.lat,
#         'lon': c.lon
#     }
#     return jsonify(result = recent_histories)


@app.route('/secure/_del_markers')
def del_markers():
    id = request.args.get('id', 0, type=int)
    # 创建session对象:
    #session = DBSession()
    # 创建新User对象:
    db.session.query(fixed_Marker).filter(fixed_Marker.id == id).delete()
    # 提交即保存到数据库:
    db.session.commit()
    # 关闭session:
    #session.close()
    
    return jsonify(result = True)

@app.route('/secure/history')
def history():
    app_num = request.args.get('app_num', 0, type=int)
    name = request.args.get('name', 0, type=str)
    val = request.args.get('time', 0, type=int)
    if(val == 0):
        c = db.session.query(data_pull_from_iottalk).filter(and_(data_pull_from_iottalk.app_num == app_num, data_pull_from_iottalk.name == name)).order_by(data_pull_from_iottalk.number.desc()).first()
        recent_histories = []
        recent_histories.append({
            'lat': c.lat,
            'lng': c.lng,
            'value': c.value,
            'time': c.time
        })
        return jsonify(result = recent_histories)

    if(val == 1):
        val = timedelta(seconds=35)#timedelta(minutes=1)
    if(val == 2):
        val = timedelta(hours=1)

    right_now = datetime.now()
    start_time = right_now - val
    c = db.session.query(data_pull_from_iottalk).filter(and_(data_pull_from_iottalk.app_num == app_num, data_pull_from_iottalk.name == name)).filter(data_pull_from_iottalk.time.between(start_time, right_now))

    recent_histories = []

    for row in c:
        recent_histories.append({
            'lat': float(row.lat),
            'lng': float(row.lng),
            'value': row.value,
            'time': row.time
        })
    return jsonify(result = recent_histories)

@app.route('/tracking/<username>')
def tracking():
    return render_template('index.html', tracking=True, username=username)



@app.route('/')
def index():
    return render_template('index.html')
    
@app.route('/admin')
@auth.login_required
def admin():
    return render_template('admin.html')

# for test
@app.route('/test')
def test():
    return render_template('test.html')
@app.route('/map-cam')
def map_cam():
    return render_template('map-cam.html')

@socketio.on('client_event')
def client_msg(msg):
    emit('server_response', {'data': msg['data']})
    
@socketio.on('connect_event')
def connected_msg(msg):
    emit('server_response', {'data': msg['data']})

@app.route('/secure/tests/endpoint', methods=['POST'])
def my_test_endpoint():
    # input_json = request.get_json(force=True) 
    # force=True, above, is necessary if another developer 
    # forgot to set the MIME type to 'application/json'
    # print("my_test_endpoint in**********\n")
    app_num = request.form['app_num']
    lat = request.form['lat']
    lng = request.form['lng']
    name = request.form['name']
    time = request.form['time']
    value = request.form['value']
    time = datetime.strptime(time, "%Y-%m-%d %H:%M:%S")
    # lat = request.args.get('lat', 0, type=float)
    # lon = request.args.get('lon', 0, type=float)
    # dog_id = request.args.get('dog_id', type=str)
    # data = request.args.get('data', type=str)
    # time = request.args.get('time', type=str)
    # time = datetime.strptime(time, "%Y-%m-%d %H:%M:%S.%f")

    socketio.emit('server_response', {'data': [app_num, lat, lng, name, value]}, namespace='/hpc', broadcast=True)
    socketio.sleep(0)
    # 创建session对象:
    #session = DBSession()
    # 创建新User对象:
    new_data = data_pull_from_iottalk(app_num=app_num, lat=lat, lng=lng, name=name, value=value, time=time)
    # 添加到session:
    db.session.add(new_data)
    # 提交即保存到数据库:
    db.session.commit()
    # 关闭session:
    #session.close()

    print(app_num, lat, lng, name, value, time)

    # Update iottalk_data_latest_record table
    c = db.session.query(iottalk_data_latest_record).filter(and_(iottalk_data_latest_record.app_num == app_num, iottalk_data_latest_record.name == name)).update(dict(lat=lat, lng=lng, value=value, time=time))
    
    if c != 0:
        db.session.commit()
        print('Update iottalk_data_latest_record table success')
    else:
        new_data = iottalk_data_latest_record(app_num=app_num, lat=lat, lng=lng, name=name, value=value, time=time)
        db.session.add(new_data)
        db.session.commit()
        print('Add iottalk_data_latest_record table success')


    # Update static_icon_table
    c = db.session.query(icon_define_table).filter(icon_define_table.number == app_num).first().kind
    if c >= 5 and c <= 8:
        c = db.session.query(static_icon_table).filter(and_(static_icon_table.app_num == app_num, static_icon_table.name == name)).update(dict(lat=lat, lng=lng))
        
        if c != 0:
            db.session.commit()
            print('Update static_icon_table success')
        else:
            new_data = static_icon_table(app_num=app_num, name=name, lat=lat, lng=lng, description=name)
            db.session.add(new_data)
            db.session.commit()
            print('Add static_icon_table success')


    result = {
        'status': 'ok'
    }
    return jsonify(result)

@app.after_request
def add_header(r):
    r.headers["Cache-Control"] = 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0, max-age=0'
    r.headers["Pragma"] = 'no-cache'
    r.headers["Expires"] = "-1"
    return r

with app.test_request_context():
    print(url_for('index'))
    print(url_for('admin'))
    print(url_for('test'))



# if __name__ == '__main__':
    #context = ('C:/Users/cindy/server.crt', 'C:/Users/cindy/server.key')
    # app.run('0.0.0.0', port=int("8866"),debug=True, threaded=True)#app.run(host='0.0.0.0', port=8866)
def map_server():
    # app.run('0.0.0.0', port=int("8866"),debug=True, threaded=True)
    socketio.run(app, host='0.0.0.0', port=int("8866"), debug=True, use_reloader=False)#app.run(host='0.0.0.0', port=8866)




