import asyncio
import requests

api_base_url = "http://localhost:3000"

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