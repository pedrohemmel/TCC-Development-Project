import asyncio
from bleak import BleakScanner
import requests
from datetime import datetime

# Configuração de informações locais e URLs dos endpoints da API
local_name = "9I92JENDNSANI"
api_base_url = "http://localhost:3000"

# Funções auxiliares para fazer POST nas diferentes tabelas

async def post_device(device_id, first_seen, last_seen):
    url = f"{api_base_url}/devices"
    data = [{
        "id_device": device_id,
        "first_seen": first_seen,
        "last_seen": last_seen
    }]
    response = requests.post(url, json=data)
    if response.status_code == 201:
        print(f"Dispositivo {device_id} inserido com sucesso.")
    else:
        print(f"Erro ao inserir dispositivo {device_id}. Status code: {response.status_code}")

async def post_device_detection(device_id, local_beacon_id, date_time_in_beacon, dwell_time):
    url = f"{api_base_url}/device-detections"
    data = [{
        "id_device": device_id,
        "local_beacon_id": local_beacon_id,
        "date_time_in_beacon": date_time_in_beacon,
        "dwell_time": dwell_time
    }]
    response = requests.post(url, json=data)
    if response.status_code == 201:
        print(f"Detecção do dispositivo {device_id} inserida com sucesso.")
    else:
        print(f"Erro ao inserir detecção do dispositivo {device_id}. Status code: {response.status_code}")

async def post_time_flow(local_beacon_id, time_slot, total_devices_detected, average_dwell_time):
    url = f"{api_base_url}/time-flow"
    data = [{
        "time_slot": time_slot,
        "local_beacon_id": local_beacon_id,
        "total_devices_detected": total_devices_detected,
        "average_dwell_time": average_dwell_time
    }]
    response = requests.post(url, json=data)
    if response.status_code == 201:
        print("Fluxo temporal inserido com sucesso.")
    elif response.status_code == 200:  # Caso de atualização no lugar de inserção
        print("Fluxo temporal atualizado com sucesso.")
    else:
        print(f"Erro ao inserir fluxo temporal. Status code: {response.status_code}")

async def post_event_alert(local_beacon_id, date_time_event, event_type, description):
    url = f"{api_base_url}/events-alerts"
    data = [{
        "local_beacon_id": local_beacon_id,
        "date_time_event": date_time_event,
        "event_type": event_type,
        "description": description,
        "resolved": False
    }]
    response = requests.post(url, json=data)
    if response.status_code == 201:
        print("Evento/Alerta inserido com sucesso.")
    else:
        print(f"Erro ao inserir evento/alerta. Status code: {response.status_code}")

# Função principal de varredura BLE e envio de dados

async def scan_ble_devices():
    local_beacon_id = 1  # Exemplo: identificação local para simular a localização do beacon

    while True:
        print("Iniciando a varredura de dispositivos BLE...")
        devices = await BleakScanner.discover()

        if devices:
            print(f"Dispositivos encontrados ({len(devices)}):")
            for device in devices:
                print(f"Nome: {device.name}, Endereço: {device.address}, RSSI: {device.rssi}")
                
                # Timestamp de detecção
                timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                
                # Inserir dispositivo e detecção
                await post_device(device_id=device.address, first_seen=timestamp, last_seen=timestamp)
                await post_device_detection(device_id=device.address, local_beacon_id=local_beacon_id, date_time_in_beacon=timestamp, dwell_time=300)

                # Inserir fluxo temporal de exemplo
                await post_time_flow(local_beacon_id=local_beacon_id, time_slot=timestamp, total_devices_detected=len(devices), average_dwell_time=450)

                # Exemplo de alerta de aglomeração
                if len(devices) > 20:  # Exemplo de condição de alerta para aglomeração
                    await post_event_alert(local_beacon_id=local_beacon_id, date_time_event=timestamp, event_type="Aglomeração", description="Alta concentração de dispositivos detectados")

        else:
            print("Nenhum dispositivo BLE encontrado.")

        # Aguardar 15 segundos antes da próxima varredura
        await asyncio.sleep(15)

# Executar a varredura
loop = asyncio.get_event_loop()
loop.run_until_complete(scan_ble_devices())
