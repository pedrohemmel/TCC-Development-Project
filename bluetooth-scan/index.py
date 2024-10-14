import asyncio
from bleak import BleakScanner

async def scan_ble_devices():
    while True:
        print("Iniciando a varredura de dispositivos BLE...")
        devices = await BleakScanner.discover()

        if devices:
            print(f"Dispositivos encontrados ({len(devices)}):")
            for device in devices:
                print(f"Nome: {device.name}, Endereço: {device.address}, RSSI: {device.rssi}")
        else:
            print("Nenhum dispositivo BLE encontrado.")

        # Espera 15 segundos antes de realizar a próxima varredura
        await asyncio.sleep(15)

# Inicia o loop do asyncio para rodar a função scan_ble_devices de forma contínua
loop = asyncio.get_event_loop()
loop.run_until_complete(scan_ble_devices())
