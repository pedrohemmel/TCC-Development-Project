const db = require('../service/dbConnection');

// Funções para a tabela Events
const getEvents = async () => {
  try {
    const [events] = await db.execute('SELECT * FROM Events;');
    return events;
  } catch (error) {
    console.error('Erro ao buscar eventos:', error);
    throw error;
  }
};

const addEvent = async (event_name, event_start, event_end, location, description) => {
  try {
    const [result] = await db.execute(
      'INSERT INTO Events (event_name, event_start, event_end, location, description) VALUES (?, ?, ?, ?, ?);',
      [event_name, event_start, event_end, location, description]
    );
    return { insertId: result.insertId };
  } catch (error) {
    console.error('Erro ao adicionar evento:', error);
    throw error;
  }
};

const updateEvent = async (event_id, event_name, event_start, event_end, location, description) => {
  try {
    await db.execute(
      'UPDATE Events SET event_name = ?, event_start = ?, event_end = ?, location = ?, description = ? WHERE event_id = ?;',
      [event_name, event_start, event_end, location, description, event_id]
    );
    return { message: 'Evento atualizado com sucesso.' };
  } catch (error) {
    console.error('Erro ao atualizar evento:', error);
    throw error;
  }
};

const deleteEvent = async (event_id) => {
  try {
    await db.execute('DELETE FROM Events WHERE event_id = ?;', [event_id]);
    return { message: 'Evento deletado com sucesso.' };
  } catch (error) {
    console.error('Erro ao deletar evento:', error);
    throw error;
  }
};

module.exports = {
  getEvents,
  addEvent,
  updateEvent,
  deleteEvent
};
