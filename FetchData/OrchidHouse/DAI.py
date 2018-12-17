# -*- coding: UTF-8 -*-
import time, requests, datetime
import DAN, table, fetchData

ServerURL = 'https://map.iottalk.tw' #with no secure connection
Reg_addr = 'TSMC_OrchidHouse_001'

DAN.profile['dm_name']='OrchidHouse'
DAN.profile['df_list']=['Temperature-I', 'Humidity-I', 'CO2-I',]
DAN.profile['d_name']= '1.OrchidHouse'

DAN.device_registration_with_retry(ServerURL, Reg_addr)

idList = ['705cd51992dc1faf544441c7dbb6e8bf', 'a9895e570f9fa4ee5a4a89ca76c7c435', 'b935c73cea07f16fdbfc5ec6665ee974']

while True:
    fetchData.fetchAllData(idList)
    try:
        humidity = (float(table.node[idList[0]][0]))
        temperature = (float(table.node[idList[1]][0]))
        co2 = (float(table.node[idList[2]][0]))
    except ValueError as e:
        time.sleep(10)
        continue
    
    try:
        DAN.push('Humidity-I', 24.772946,  121.011238, 'Orchid_House', humidity, str(datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')))
        print('Humidity-I', 24.772946,  121.011238, 'Orchid_House', humidity, str(datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')))
        DAN.push('Temperature-I', 24.772946,  121.011238, 'Orchid_House', temperature, str(datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')))
        print('Temperature-I', 24.772946,  121.011238, 'Orchid_House', temperature, str(datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')))
        DAN.push('CO2-I', 24.772946,  121.011238, 'Orchid_House', co2, str(datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')))
        print('CO2-I', 24.772946,  121.011238, 'Orchid_House', co2, str(datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')))
    except Exception as e:
        print(e)
        if str(e).find('mac_addr not found:') != -1:
            print('Reg_addr is not found. Try to re-register...')
            DAN.device_registration_with_retry(ServerURL, Reg_addr)
        else:
            print('Connection failed due to unknow reasons.')
            time.sleep(1)    

    time.sleep(600)


