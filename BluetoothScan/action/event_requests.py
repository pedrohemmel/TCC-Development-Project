import asyncio
import requests

api_base_url = "http://localhost:3000"

async def get_events():
    url = f"{api_base_url}/events"
    response = requests.get(url)
    if response.status_code == 200:
        events = response.json()
        print("Eventos obtidos com sucesso:", events)
        return events
    else:
        print(f"Erro ao obter eventos. Status code: {response.status_code}")

async def post_event(event_name, event_start, event_end, location, description):
    url = f"{api_base_url}/events"
    data = {
        "event_name": event_name,
        "event_start": event_start,
        "event_end": event_end,
        "location": location,
        "description": description
    }
    response = requests.post(url, json=data)
    if response.status_code == 201:
        print("Evento inserido com sucesso.")
    else:
        print(f"Erro ao inserir evento. Status code: {response.status_code}")

async def update_event(event_id, event_name, event_start, event_end, location, description):
    url = f"{api_base_url}/events"
    data = {
        "event_id": event_id,
        "event_name": event_name,
        "event_start": event_start,
        "event_end": event_end,
        "location": location,
        "description": description
    }
    response = requests.put(url, json=data)
    if response.status_code == 200:
        print("Evento atualizado com sucesso.")
    else:
        print(f"Erro ao atualizar evento. Status code: {response.status_code}")

async def delete_event(event_id):
    url = f"{api_base_url}/events/{event_id}"
    response = requests.delete(url)
    if response.status_code == 200:
        print("Evento deletado com sucesso.")
    else:
        print(f"Erro ao deletar evento. Status code: {response.status_code}")
