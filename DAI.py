import time, DAN, requests, random, json
import main
from datetime import datetime


ServerIP = 'https://weathermap.iottalk.tw' #Change to your IoTtalk IP or None for autoSearching
Reg_addr='MAP_DEFAULT_SERVER' #None # if None, Reg_addr = MAC address

DAN.profile['dm_name']='Map'
DAN.profile['df_list']=[]
DAN.profile['d_name']= None # None for autoNaming
# DAN.device_registration_with_retry(ServerIP, Reg_addr)

all_app_list = []
all_app_num = []

def iottalk_device_feature_update():
    global all_app_list
    global all_app_num

    c = main.db.session.query(main.icon_define_table).all()
    DAN.profile['dm_name']='Map'
    DAN.profile['df_list']=[]
    DAN.profile['d_name']= None
    all_app_list = []
    all_app_num = []
    for row in c:
        DAN.profile['df_list'].append('GeoData_O'+ str(c.index(row)+1))
        all_app_list.append(row.app)
        all_app_num.append(row.number)

    print (DAN.profile['df_list'])
    DAN.device_registration_with_retry(ServerIP, Reg_addr)


def dai():
    global all_app_list
    global all_app_num
    # DAN.set_alias('GeoData_O1','Dog');
    while True:
        try:
        #Pull data from a device feature called "Dummy_Control"
            for num in range(1, len(all_app_list)+1):
                value = DAN.pull('GeoData_O'+ str(num))
                if value != None:
                    # print('GeoData_O'+ str(num))
                    # print (all_app_list[num-1]+": lat " + str(value[0]) + ", lng " + str(value[1]) + ", name " + str(value[2]) + ", value " + str(value[3]) + ", time " + str(value[4]))
                    post_data = {
                        'app_num': all_app_num[num-1],
                        'lat': value[0],
                        'lng': value[1],
                        'name': value[2],
                        'value': value[3],
                        'time': value[4]#str(datetime.now())
                    }
                    # main.socketio.emit('server_response', {'data': value1[0]}, namespace='/hpc', broadcast=True)
                    main.requests.post('http://localhost:8866/secure/tests/endpoint', data=post_data)

        except Exception as e:
            print(e)
            DAN.device_registration_with_retry(ServerIP, Reg_addr)

        time.sleep(0.2)
