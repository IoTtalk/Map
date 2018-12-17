import time, DAN, requests
from sensor_const import airbox_url
from sensor_const import airbox_sensor_list

ServerIP = 'localhost' 
Reg_addr = 'AirBoxDataFeatchNumberOne' #For the different DA in the same computer, the Reg_addr needs to be modified.

DAN.profile['dm_name']='AirBoxData'
DAN.profile['df_list']=['CO2-I', 'Humidity-I', 'PM2.5-I','Temperature-I']
DAN.profile['d_name']= None

DAN.Target_df_list = []
for IDF in DAN.profile['df_list']: DAN.Target_df_list.append(IDF[:-2])

DAN.device_registration_with_retry(ServerIP, Reg_addr)
while True:
    try:
        data = DAN.pull_airbox(airbox_url)
        if data != None and data !=[]:
            for devices in data:
                for sensor in airbox_sensor_list:
                    print(sensor['FEATURE_NAME'], devices['lat'], devices['lon'], str(sensor['NAME_ON_MAP']+ "_" + devices['name']), round(devices[sensor['NAME_ON_AIRBOX']],1), devices['time'])
                    DAN.push(sensor['FEATURE_NAME']+'-I', devices['lat'], devices['lon'], str(sensor['NAME_ON_MAP']+ "_" + devices['name']), round(devices[sensor['NAME_ON_AIRBOX']],1), devices['time'])
                    time.sleep(1)

    except Exception as e:
        print(e)
        if str(e).find('mac_addr not found:') != -1:
            print('Reg_addr is not found. Try to re-register...')
            DAN.device_registration_with_retry(ServerIP, Reg_addr)
        else:
            print('Connection failed due to unknow reasons.')
            time.sleep(1)    

    time.sleep(300)
