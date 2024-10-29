const model = require('../model/devicesModel');

const getDevices = async (_req, res) => {
    try {
        const payload = await model.getDevices();
        return res.status(200).json(payload);
    } catch (error) {
        console.error('Erro ao buscar dispositivos:', error);
        return res.status(500).json({ message: 'Erro ao buscar dispositivos' });
    }
};

const addDevices = async (req, res) => {
    const devices = req.body;
    try {
        const results = [];
        for (const device of devices) {
            const { first_seen, last_seen } = device;
            const result = await model.addDevice(first_seen, last_seen);
            results.push(result);
        }
        return res.status(201).json(results);
    } catch (error) {
        console.error('Erro ao adicionar dispositivos:', error);
        return res.status(500).json({ message: 'Erro ao adicionar dispositivos' });
    }
};

const updateDevice = async (req, res) => {
    const { id_device, last_seen } = req.body;
    try {
        const payload = await model.updateDevice(id_device, last_seen);
        return res.status(200).json(payload);
    } catch (error) {
        console.error('Erro ao atualizar dispositivo:', error);
        return res.status(500).json({ message: 'Erro ao atualizar dispositivo' });
    }
};

const deleteDevice = async (req, res) => {
    const { id_device } = req.params;
    try {
        const payload = await model.deleteDevice(id_device);
        return res.status(200).json(payload);
    } catch (error) {
        console.error('Erro ao deletar dispositivo:', error);
        return res.status(500).json({ message: 'Erro ao deletar dispositivo' });
    }
};

module.exports = {
    getDevices,
    addDevices,
    updateDevice,
    deleteDevice
};
