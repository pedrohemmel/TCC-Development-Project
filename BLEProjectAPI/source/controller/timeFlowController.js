const model = require('../model/timeFlowModel');

const getTimeFlow = async (_req, res) => {
    try {
        const payload = await model.getTimeFlow();
        return res.status(200).json(payload);
    } catch (error) {
        console.error('Erro ao buscar fluxo temporal:', error);
        return res.status(500).json({ message: 'Erro ao buscar fluxo temporal' });
    }
};

const addTimeFlows = async (req, res) => {
    const timeFlows = req.body;
    try {
        const results = [];
        for (const flow of timeFlows) {
            const { time_slot, local_beacon_id, total_devices_detected, average_dwell_time } = flow;
            const result = await model.addTimeFlow(time_slot, local_beacon_id, total_devices_detected, average_dwell_time);
            results.push(result);
        }
        return res.status(201).json(results);
    } catch (error) {
        console.error('Erro ao adicionar fluxos temporais:', error);
        return res.status(500).json({ message: 'Erro ao adicionar fluxos temporais' });
    }
};

const updateTimeFlow = async (req, res) => {
    const { time_slot, local_beacon_id, total_devices_detected, average_dwell_time } = req.body;
    try {
        const payload = await model.updateTimeFlow(time_slot, local_beacon_id, total_devices_detected, average_dwell_time);
        return res.status(200).json(payload);
    } catch (error) {
        console.error('Erro ao atualizar fluxo temporal:', error);
        return res.status(500).json({ message: 'Erro ao atualizar fluxo temporal' });
    }
};

module.exports = {
    getTimeFlow,
    addTimeFlows,
    updateTimeFlow
};
