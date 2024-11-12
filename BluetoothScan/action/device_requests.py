import asyncio
import requests

api_base_url = "http://localhost:3000"

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