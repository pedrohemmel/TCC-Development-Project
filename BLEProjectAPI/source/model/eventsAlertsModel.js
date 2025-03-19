const db = require('../service/dbConnection');

// Funções para a tabela Events_Alerts
const getEventsAlerts = async () => {
  try {
    const [events] = await db.execute('SELECT * FROM Events_Alerts;');
    return events;
  } catch (error) {
    console.error('Erro ao buscar eventos/alertas:', error);
    throw error;
  }
};

const addEventAlert = async (event_id, local_beacon_id, date_time_event, event_type, description) => {
  try {
    const [result] = await db.execute(
      'INSERT INTO Events_Alerts (event_id, local_beacon_id, date_time_event, event_type, description) VALUES (?, ?, ?, ?, ?);',
      [event_id, local_beacon_id, date_time_event, event_type, description]
    );
    return { insertId: result.insertId };
  } catch (error) {
    console.error('Erro ao adicionar evento/alerta:', error);
    throw error;
  }
};

const updateEventAlert = async (event_id, resolved) => {
  try {
    await db.execute(
      'UPDATE Events_Alerts SET resolved = ? WHERE event_id = ?;',
      [resolved, event_id]
    );
    return { message: 'Evento/alerta atualizado com sucesso.' };
  } catch (error) {
    console.error('Erro ao atualizar evento/alerta:', error);
    throw error;
  }
};

const deleteEventAlert = async (event_id) => {
  try {
    await db.execute('DELETE FROM Events_Alerts WHERE event_id = ?;', [event_id]);
    return { message: 'Evento/alerta deletado com sucesso.' };
  } catch (error) {
    console.error('Erro ao deletar evento/alerta:', error);
    throw error;
  }
};

module.exports = {
  getEventsAlerts,
  addEventAlert,
  updateEventAlert,
  deleteEventAlert
};
