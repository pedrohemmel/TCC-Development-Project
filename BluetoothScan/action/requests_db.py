import asyncio
import requests

# Configuração de informações locais e URLs dos endpoints da API

api_base_url = "http://localhost:3000"

# Funções auxiliares para fazer POST nas diferentes tabelas

######adicionar função de achar dispositivo na API
async def get_device(device_id):
    url = f"{api_base_url}/device"
    request = {
        "id_device": device_id
    }
    try:
        response = requests.post(url, json=request)
        if response.status_code < 200 or response.status_code > 299:
            print(f"Dispositivo {device_id} não registrado no sistema")
            return None
        else:
            device_data = response.json()
            print(f"Dispositivo {device_id} registrado no sistema: {device_data}")
            return device_data
    except requests.RequestException as e:
        print(f"Erro de requisição: {e}")
        return None

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

async def update_device(device_id, last_seen):
    url = f"{api_base_url}/devices"
    payload = {
        "id_device": device_id,
        "last_seen": last_seen
    }
    try:
        response = requests.put(url, json=payload)
        if response.status_code >= 200 and response.status_code < 300:
            print(f"Dispositivo {device_id} atualizado com sucesso.")
            return response.json()
        else:
            print(f"Erro ao atualizar o dispositivo {device_id}: {response.status_code}")
            return None
    except requests.RequestException as e:
        print(f"Erro de requisição: {e}")
        return None

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

async def post_beacon(beacon_id, location_name):
    url = f"{api_base_url}/beacon-locations"
    data = [{
        "beacon_id": beacon_id,
        "location_name": location_name
    }]
    try:
        response = requests.post(url, json=data)
        if response.status_code == 201:
            print(f"Beacon {beacon_id} inserido com sucesso.")
        else:
            print(f"Erro ao inserir beacon {beacon_id}. Status code: {response.status_code}")
    except requests.RequestException as e:
        print(f"Erro de requisição ao inserir beacon {beacon_id}: {e}")

async def get_beacon(beacon_id):
    url = f"{api_base_url}/beacon-location"
    request = {
        "id": beacon_id
    }
    try:
        response = requests.post(url, json=request)
        if response.status_code < 200 or response.status_code > 299:
            print(f"Dispositivo {beacon_id} não registrado no sistema")
            return None
        else:
            device_data = response.json()
            print(f"Dispositivo {beacon_id} registrado no sistema: {device_data}")
            return device_data
    except requests.RequestException as e:
        print(f"Erro de requisição: {e}")
        return None
