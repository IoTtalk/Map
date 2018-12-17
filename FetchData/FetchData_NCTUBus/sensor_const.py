#NCTUBus POST url
NCTUBus_url = 'https://www.pharoscloud.com/SmartBus/WebServiceHost/Services/GpsSrv.asmx/GetLastGpsReadingsByDevicesJson'
NCTUBus_post_data = { "deviceIds": "352544073523715,352544073524820,352544073523756" }

#NCTUBus sensor list
#POST https://www.pharoscloud.com/SmartBus/WebServiceHost/Services/BusSrv.asmx/GetDeviceVehiclesBySystemJson
# {
# 	"busSystemId": 37
# }
NCTUBus_sensor_list = [
{'DeviceId': '352544073523715','Nickname': '光復博愛大巴', 'NAME_ON_MAP': 'NCTUBus_光復博愛大巴'},
{'DeviceId': '352544073524820',"Nickname": '高鐵大巴', 'NAME_ON_MAP': 'NCTUBus_高鐵大巴'},
{'DeviceId': '352544073523756',"Nickname": '機動中巴', 'NAME_ON_MAP': 'NCTUBus_機動中巴'},
]

