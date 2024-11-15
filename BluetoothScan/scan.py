#Imports remotos
import asyncio
import requests

from bleak import BleakScanner

from datetime import datetime

#Imports locais do projeto
from model.device_model import *
from model.alert_event_model import *

from action.beacon_requests import *
from action.device_detection_requests import *
from action.device_requests import *
from action.event_alert_requests import *

#Local variables
reach_square_meters = 50

crowded_area_limit = 3
risk_crowded_area_limit = 4
critical_risk_crowded_area_limit = 5


local_beacon_id = 1
local_name = "portaria_2"

event_id = 1

# Funções auxiliares
async def devices_missing_on_list(new_list, old_list):
    # Extraindo os id_device de cada lista para comparar
    new_ids = {item.id_device for item in new_list}
    missing_list = [item for item in old_list if item.id_device not in new_ids]
    return missing_list

def deviceIsNotInList(device_list, device):
    return len([item for item in device_list if device['id_device'] == item.id_device]) == 0

def eventAlert(device_list):
    if len(device_list) >= (critical_risk_crowded_area_limit * reach_square_meters):
        return alert_event_model.CRITICAL_RISK_AREA
    elif len(device_list) >= (risk_crowded_area_limit * reach_square_meters):
        return alert_event_model.RISK_AREA
    elif len(device_list) >= (crowded_area_limit * reach_square_meters):
        return alert_event_model.CROWDED_AREA
    return alert_event_model.SAFE_AREA

async def register_local_beacon_id_needed():
    beacon_found = await get_beacon(local_beacon_id)
    if beacon_found == None:
        await post_beacon(local_beacon_id, local_name)

async def register_devices(device_list):
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    for device in device_list:
        device_found = await get_device(device_id=device.id_device)
        if device_found != None:
            await update_device(device_id=device_found['id_device'], last_seen=now)
        else:
            await post_device(device_id=device.id_device, first_seen=device.first_seen, last_seen=now)

async def register_devices_detection(device_list):
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    for device in device_list:
        await post_device_detection(device_id=device.id_device, local_beacon_id=local_beacon_id, event_id=event_id, date_time_in_beacon=now, dwell_time=device.dwell_time)

async def registerEventAlert(event_alert):
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    if event_alert != alert_event_model.SAFE_AREA:
        await post_event_alert(event_id, local_beacon_id, now, event_alert.name, event_alert.value)

# Função principal de varredura BLE e envio de dados
async def scan_ble_devices():
    await register_local_beacon_id_needed()
    device_list = []
    new_device_list = []
    while True:
        print("Iniciando a varredura de dispositivos BLE...")
        devices = await BleakScanner.discover()
        if devices:
            print(f"Dispositivos encontrados ({len(devices)}):")
            for device in devices:
                if device.address == "DDF373F2-7091-1532-8444-303B15B3026D":
                    device_name = device.name
                    device_found = await get_device(device_id=device.address)
                    
                    if device_found is None:
                        now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                        device = device_model(id_device=device.address, first_seen=now, last_seen=now, dwell_time=0)
                        await register_devices([device])
                        new_device_list.append(device)
                        print("________________-------------------_______________")
                        print(f"Nome: {device_name}, id: {device.id_device}, ACABOU DE SER INSERIDO")
                    elif deviceIsNotInList(device_list, device_found):
                        device_in_list = device_model(
                            id_device=device_found['id_device'],
                            first_seen=device_found['first_seen'],
                            last_seen=device_found['last_seen'],
                            dwell_time=0
                        )
                        new_device_list.append(device_in_list)
                        print(f"Nome: {device_name}, id: {device_in_list.id_device}, EXISTENTE NO DB MAS É A PRIMEIRA VEZ")
                    else:
                        device_found_item = [item for item in device_list if device_found['id_device'] == item.id_device]
                        new_device_list = [item for item in new_device_list if device_found['id_device'] != item.id_device]
                        device_in_list = device_model(
                            id_device=device_found_item[0].id_device,
                            first_seen=device_found_item[0].first_seen,
                            last_seen=device_found_item[0].last_seen,
                            dwell_time=device_found_item[0].dwell_time + 15
                        )
                        new_device_list.append(device_in_list)
                        print(f"Nome: {device_name}, id: {device_in_list.id_device}, SEGUNDA VEZ AQUI, SEU TEMPO AQUI JÁ É DE: {device_in_list.dwell_time}")

            event_alert = eventAlert(new_device_list)
            await registerEventAlert(event_alert)

            missing_list = new_device_list
            if len(device_list) > 0:
                missing_list = await devices_missing_on_list(new_device_list, device_list)
                # print(missing_list)
                await register_devices(missing_list)
                await register_devices_detection(missing_list)
            else:
                await register_devices(missing_list)
            device_list.clear()
            for item in new_device_list:
                device_list.append(item)
            new_device_list.clear()
        else:
            print("Nenhum dispositivo BLE encontrado.")

        # Aguardar 15 segundos antes da próxima varredura
        await asyncio.sleep(5)

# Executar a varredura
loop = asyncio.get_event_loop()
loop.run_until_complete(scan_ble_devices())

async def teste_missinglist():
    new_list = [
    device_model("DB89539C-6407-9EFD-4E4E-8C45CB420764", datetime.now().strftime("%Y-%m-%d %H:%M:%S"), datetime.now().strftime("%Y-%m-%d %H:%M:%S"), 12),
    device_model("64FDB681-16E6-C9B8-574D-48E8A403F304", datetime.now().strftime("%Y-%m-%d %H:%M:%S"), datetime.now().strftime("%Y-%m-%d %H:%M:%S"), 12),
    device_model("4F847F2C-3E73-3F28-019E-35A42BED8C9F", datetime.now().strftime("%Y-%m-%d %H:%M:%S"), datetime.now().strftime("%Y-%m-%d %H:%M:%S"), 12)
    ]

    old_list = [
    device_model("DB89539C-6407-9EFD-4E4E-8C45CB420764", datetime.now().strftime("%Y-%m-%d %H:%M:%S"), datetime.now().strftime("%Y-%m-%d %H:%M:%S"), 12),
    device_model("64FDB681-16E6-C9B8-574D-48E8A403F304", datetime.now().strftime("%Y-%m-%d %H:%M:%S"), datetime.now().strftime("%Y-%m-%d %H:%M:%S"), 12),
    device_model("5CA7D229-5FC1-89D9-A54C-B7E023057910", datetime.now().strftime("%Y-%m-%d %H:%M:%S"), datetime.now().strftime("%Y-%m-%d %H:%M:%S"), 12),
    device_model("5CA7D229-5FC1-89D9-A54C-B7E023057911", datetime.now().strftime("%Y-%m-%d %H:%M:%S"), datetime.now().strftime("%Y-%m-%d %H:%M:%S"), 12),
    device_model("5CA7D229-5FC1-89D9-A54C-B7E023057912", datetime.now().strftime("%Y-%m-%d %H:%M:%S"), datetime.now().strftime("%Y-%m-%d %H:%M:%S"), 12),
    device_model("5CA7D229-5FC1-89D9-A54C-B7E023057930", datetime.now().strftime("%Y-%m-%d %H:%M:%S"), datetime.now().strftime("%Y-%m-%d %H:%M:%S"), 12),
    device_model("5CA7D229-5FC1-89D9-A54C-B7E023057904", datetime.now().strftime("%Y-%m-%d %H:%M:%S"), datetime.now().strftime("%Y-%m-%d %H:%M:%S"), 12)
    ]

    missing_list = await devices_missing_on_list(new_list, old_list)
    print(missing_list)  # Esperado: ["5CA7D229-5FC1-89D9-A54C-B7E023057910"]


# asyncio.run(teste_missinglist())

