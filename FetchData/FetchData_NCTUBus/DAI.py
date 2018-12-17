import time, DAN, requests, arrow
from datetime import datetime
from sensor_const import NCTUBus_url
from sensor_const import NCTUBus_post_data
from sensor_const import NCTUBus_sensor_list

ServerIP = 'localhost' 
Reg_addr = 'NCTUBusDataFeatchNumberOne' #For the different DA in the same computer, the Reg_addr needs to be modified.

DAN.profile['dm_name']='NCTUBusData'
DAN.profile['df_list']=['BusGeoData-I']
DAN.profile['d_name']= None

DAN.Target_df_list = []
for IDF in DAN.profile['df_list']: DAN.Target_df_list.append(IDF[:-2])

DAN.device_registration_with_retry(ServerIP, Reg_addr)
while True:
    try:
        data = DAN.pull_NCTUBus(NCTUBus_url, NCTUBus_post_data)        
        if data != None and data !=[]:
            for num in range(len(data)):
                timestamp = arrow.get(data[num]['GpsTimeUtc']).to('local').format('YYYY-MM-DD HH:mm:ss')
                now = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
                # filter and replace strange timestamp
                if timestamp[0:4] != now[0:4]:
                    timestamp = now

                print('BusGeoData-I', data[num]['Latitude'], data[num]['Longitude'], NCTUBus_sensor_list[num]['NAME_ON_MAP'], num, timestamp)
                DAN.push('BusGeoData-I', data[num]['Latitude'], data[num]['Longitude'], NCTUBus_sensor_list[num]['NAME_ON_MAP'], num, timestamp)
                time.sleep(2)

    except Exception as e:
        print(e)
        if str(e).find('mac_addr not found:') != -1:
            print('Reg_addr is not found. Try to re-register...')
            DAN.device_registration_with_retry(ServerIP, Reg_addr)
        else:
            print('Connection failed due to unknow reasons.')
            time.sleep(1)    

    time.sleep(20)
