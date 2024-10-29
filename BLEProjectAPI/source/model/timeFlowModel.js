const db = require('../service/dbConnection');

// Funções para a tabela Time_Flow
const getTimeFlow = async () => {
  try {
    const [timeFlows] = await db.execute('SELECT * FROM Time_Flow;');
    return timeFlows;
  } catch (error) {
    console.error('Erro ao buscar fluxo temporal:', error);
    throw error;
  }
};

const addTimeFlow = async (time_slot, local_beacon_id, total_devices_detected, average_dwell_time) => {
  try {
    const [result] = await db.execute(
      'INSERT INTO Time_Flow (time_slot, local_beacon_id, total_devices_detected, average_dwell_time) VALUES (?, ?, ?, ?);',
      [time_slot, local_beacon_id, total_devices_detected, average_dwell_time]
    );
    return { insertId: result.insertId };
  } catch (error) {
    console.error('Erro ao adicionar fluxo temporal:', error);
    throw error;
  }
};

const updateTimeFlow = async (time_slot, local_beacon_id, total_devices_detected, average_dwell_time) => {
  try {
    await db.execute(
      'UPDATE Time_Flow SET total_devices_detected = ?, average_dwell_time = ? WHERE time_slot = ? AND local_beacon_id = ?;',
      [total_devices_detected, average_dwell_time, time_slot, local_beacon_id]
    );
    return { message: 'Fluxo temporal atualizado com sucesso.' };
  } catch (error) {
    console.error('Erro ao atualizar fluxo temporal:', error);
    throw error;
  }
};

module.exports = {
  getTimeFlow,
  addTimeFlow,
  updateTimeFlow
};
