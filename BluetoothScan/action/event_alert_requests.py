import asyncio
import requests

api_base_url = "http://localhost:3000"

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

