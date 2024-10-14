import asyncio
from bleak import BleakScanner
import requests
from datetime import datetime

local_name = "9I92JENDNSANI"
api_url = "https://api-endpoint-url.com/devices"

async def scan_ble_devices():
    while True:
        print("Iniciando a varredura de dispositivos BLE...")
        devices = await BleakScanner.discover()

        if devices:
            print(f"Dispositivos encontrados ({len(devices)}):")
            for device in devices:
                print(f"Nome: {device.name}, Endereço: {device.address}, RSSI: {device.rssi}")
                
                timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

                data = {
                    "local_name": local_name,
                    "device_id": device.address,
                    "timestamp": timestamp
                }

                try:
                    response = requests.post(api_url, json=data)
                    if response.status_code == 200:
                        print(f"Dispositivo {device.address} enviado com sucesso!")
                    else:
                        print(f"Erro ao enviar o dispositivo {device.address}. Status code: {response.status_code}")
                except Exception as e:
                    print(f"Erro ao enviar os dados para a API: {e}")
        else:
            print("Nenhum dispositivo BLE encontrado.")

        await asyncio.sleep(15)

loop = asyncio.get_event_loop()
loop.run_until_complete(scan_ble_devices())
