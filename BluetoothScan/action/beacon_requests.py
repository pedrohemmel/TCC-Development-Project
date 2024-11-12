import asyncio
import requests

api_base_url = "http://localhost:3000"

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