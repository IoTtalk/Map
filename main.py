#!/usr/bin/env python
# -*- coding: utf-8 -*- 
import time, requests, random, json
from datetime import datetime, timedelta
from sqlalchemy import Column, String, Float, Integer, DATETIME
#from sqlalchemy.orm import sessionmaker
#from sqlalchemy.ext.declarative import declarative_base
from flask import Flask, jsonify, render_template, request, url_for
from flask_sqlalchemy import SQLAlchemy
#from create_DB import Dog
import json

app = Flask(__name__)
# 設定資料庫位置，並建立 app
#path為3條線///
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///Dog.db'
#由於SQLALCHEMY_TRACK_MODIFICATIONS預設為None, 因此我們須給True or False
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
# 创建对象的基类:
#Base = declarative_base()

class fixed_Marker(db.Model):
    # 表的名字:
    __tablename__ = 'marker'

    # 表的结构:
    id = Column(Integer, primary_key=True)
    lat = Column(Float)
    lon = Column(Float)
    type = Column(String(20))
    content = Column(String(500))

    __table_args__ = {'sqlite_autoincrement': True}


# 定义User对象:
class Dog(db.Model):
    # 表的名字:
    __tablename__ = 'dog'

    # 表的结构:
    id = Column(Integer, primary_key=True)
    dog_id = Column(Integer)
    lat = Column(Float)
    lon = Column(Float)
    timestamp = Column(DATETIME)
    data = Column(String(500))

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

@app.route('/_take_markers')
def take_markers():
    c = db.session.query(fixed_Marker).all()
    recent_histories = []
    
    for row in c:
        recent_histories.append({
            'id': row.id,
            'lat': row.lat,
            'lon': row.lon,
            'type': row.type,
            'content': row.content,
        })
    return jsonify(result = recent_histories)

@app.route('/_take_obstacles')
def take_obstacles():
    c = db.session.query(fixed_Marker).filter_by(type = 'obstacle').all()
    recent_histories = []
    
    for row in c:
        recent_histories.append({
            'id': row.id,
            'lat': row.lat,
            'lon': row.lon,
            'type': row.type,
            'content': row.content,
        })
    return jsonify(result = recent_histories)

@app.route('/_add_numbers')
def add_numbers():
    lat = request.args.get('lat', 0, type=float)
    lon = request.args.get('lon', 0, type=float)
    dog_id = request.args.get('dog_id', type=int)
    data = request.args.get('data', type=str)
    time = request.args.get('time', type=str)
    time = datetime.strptime(time, "%Y-%m-%d %H:%M:%S.%f")
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

@app.route('/_add_markers')
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

@app.route('/_modify_markers')
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

# @app.route('/_take_active_markers')
# def _take_active_markers():
#     dog_id = request.args.get('dog_id', type=int)
#     c = db.session.query(Dog).filter(Dog.dog_id == dog_id).order_by(Dog.id.desc()).first()
    
#     recent_histories={
#         'id':  c.dog_id,
#         'lat': c.lat,
#         'lon': c.lon
#     }
#     return jsonify(result = recent_histories)


@app.route('/_del_markers')
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

@app.route('/history')
def history():
    dog_id = request.args.get('dog_id', 0, type=int)
    val = request.args.get('time', 0, type=int)
    if(val == 1):
        val = timedelta(hours=1)
    if(val == 2):
        val = timedelta(days=1)
    right_now = datetime.now()#datetime.strptime('2017-08-1 00:12:00.00', "%Y-%m-%d %H:%M:%S.%f")
    start_time = right_now - val#days=2 hours=2
    print(start_time)
    c = db.session.query(Dog).filter_by(dog_id = dog_id).filter(Dog.timestamp.between(start_time, right_now))#all()
    # c = db.session.query(Dog).filter_by(dog_id = dog_id).filter(Dog.timestamp.between('2017-08-17 17:12:00.00', '2017-08-17 17:12:40.00'))#all()
    recent_histories = []
    
    for row in c:
        recent_histories.append({
            'id': row.id,
            'dog_id': row.dog_id,
            'lat': row.lat,
            'lon': row.lon,
            'data': row.data,
        })
    return jsonify(result = recent_histories)

@app.route('/index')
def index():
    return render_template('index.html')
@app.route('/admin')
def admin():
    return render_template('admin.html')

with app.test_request_context():
    print(url_for('index'))
    print(url_for('admin'))





if __name__ == '__main__':
    #context = ('C:/Users/cindy/server.crt', 'C:/Users/cindy/server.key')
    app.run('0.0.0.0', port=int("8866"),debug=True, threaded=True)#app.run(host='0.0.0.0', port=8866)

