const model = require('../model/eventsAlertsModel');

const getEventsAlerts = async (_req, res) => {
    try {
        const payload = await model.getEventsAlerts();
        return res.status(200).json(payload);
    } catch (error) {
        console.error('Erro ao buscar eventos/alertas:', error);
        return res.status(500).json({ message: 'Erro ao buscar eventos/alertas' });
    }
};

const addEventsAlerts = async (req, res) => {
    const events = req.body;
    try {
        const results = [];
        for (const event of events) {
            const { event_id, local_beacon_id, date_time_event, event_type, description } = event;
            const result = await model.addEventAlert(event_id, local_beacon_id, date_time_event, event_type, description);
            results.push(result);
        }
        return res.status(201).json(results);
    } catch (error) {
        console.error('Erro ao adicionar eventos/alertas:', error);
        return res.status(500).json({ message: 'Erro ao adicionar eventos/alertas' });
    }
};

const updateEventAlert = async (req, res) => {
    const { event_id, resolved } = req.body;
    try {
        const payload = await model.updateEventAlert(event_id, resolved);
        return res.status(200).json(payload);
    } catch (error) {
        console.error('Erro ao atualizar evento/alerta:', error);
        return res.status(500).json({ message: 'Erro ao atualizar evento/alerta' });
    }
};

const deleteEventAlert = async (req, res) => {
    const { event_id } = req.params;
    try {
        const payload = await model.deleteEventAlert(event_id);
        return res.status(200).json(payload);
    } catch (error) {
        console.error('Erro ao deletar evento/alerta:', error);
        return res.status(500).json({ message: 'Erro ao deletar evento/alerta' });
    }
};

module.exports = {
    getEventsAlerts,
    addEventsAlerts,
    updateEventAlert,
    deleteEventAlert
};