const model = require('../model/eventsModel');

const getEvents = async (_req, res) => {
  try {
    const payload = await model.getEvents();
    return res.status(200).json(payload);
  } catch (error) {
    console.error('Erro ao buscar eventos:', error);
    return res.status(500).json({ message: 'Erro ao buscar eventos' });
  }
};

const addEvent = async (req, res) => {
  const { event_name, event_start, event_end, location, description } = req.body;
  try {
    const result = await model.addEvent(event_name, event_start, event_end, location, description);
    return res.status(201).json(result);
  } catch (error) {
    console.error('Erro ao adicionar evento:', error);
    return res.status(500).json({ message: 'Erro ao adicionar evento' });
  }
};

const updateEvent = async (req, res) => {
  const { event_id, event_name, event_start, event_end, location, description } = req.body;
  try {
    const payload = await model.updateEvent(event_id, event_name, event_start, event_end, location, description);
    return res.status(200).json(payload);
  } catch (error) {
    console.error('Erro ao atualizar evento:', error);
    return res.status(500).json({ message: 'Erro ao atualizar evento' });
  }
};

const deleteEvent = async (req, res) => {
  const { event_id } = req.params;
  try {
    const payload = await model.deleteEvent(event_id);
    return res.status(200).json(payload);
  } catch (error) {
    console.error('Erro ao deletar evento:', error);
    return res.status(500).json({ message: 'Erro ao deletar evento' });
  }
};

module.exports = {
  getEvents,
  addEvent,
  updateEvent,
  deleteEvent
};
