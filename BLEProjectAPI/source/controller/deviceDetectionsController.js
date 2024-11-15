const model = require('../model/deviceDetectionsModel');

const getDeviceDetections = async (_req, res) => {
    try {
        const payload = await model.getDeviceDetections();
        return res.status(200).json(payload);
    } catch (error) {
        console.error('Erro ao buscar detecções de dispositivos:', error);
        return res.status(500).json({ message: 'Erro ao buscar detecções' });
    }
};

const addDeviceDetections = async (req, res) => {
    const detections = req.body;
    try {
        const results = [];
        for (const detection of detections) {
            const { id_device, local_beacon_id, event_id, date_time_in_beacon, dwell_time } = detection;
            const result = await model.addDeviceDetection(id_device, local_beacon_id, event_id, date_time_in_beacon, dwell_time);
            results.push(result);
        }
        return res.status(201).json(results);
    } catch (error) {
        console.error('Erro ao adicionar detecções:', error);
        return res.status(500).json({ message: 'Erro ao adicionar detecções' });
    }
};

const deleteDeviceDetection = async (req, res) => {
    const { detection_id } = req.params;
    try {
        const payload = await model.deleteDeviceDetection(detection_id);
        return res.status(200).json(payload);
    } catch (error) {
        console.error('Erro ao deletar detecção:', error);
        return res.status(500).json({ message: 'Erro ao deletar detecção' });
    }
};

module.exports = {
    getDeviceDetections,
    addDeviceDetections,
    deleteDeviceDetection
};
