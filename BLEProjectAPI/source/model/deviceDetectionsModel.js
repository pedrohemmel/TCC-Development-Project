const db = require('../service/dbConnection');

// Funções para a tabela Device_Detection
const getDeviceDetections = async () => {
  try {
    const [detections] = await db.execute('SELECT * FROM Device_Detection;');
    return detections;
  } catch (error) {
    console.error('Erro ao buscar detecções de dispositivos:', error);
    throw error;
  }
};

const addDeviceDetection = async (id_device, local_beacon_id, event_id, date_time_in_beacon, dwell_time) => {
  try {
    const [result] = await db.execute(
      'INSERT INTO Device_Detection (id_device, local_beacon_id, event_id, date_time_in_beacon, dwell_time) VALUES (?, ?, ?, ?, ?);',
      [id_device, local_beacon_id, event_id, date_time_in_beacon, dwell_time]
    );
    return { insertId: result.insertId };
  } catch (error) {
    console.error('Erro ao adicionar detecção de dispositivo:', error);
    throw error;
  }
};

const deleteDeviceDetection = async (detection_id) => {
  try {
    await db.execute('DELETE FROM Device_Detection WHERE detection_id = ?;', [detection_id]);
    return { message: 'Detecção de dispositivo deletada com sucesso.' };
  } catch (error) {
    console.error('Erro ao deletar detecção de dispositivo:', error);
    throw error;
  }
};

module.exports = {
  getDeviceDetections,
  addDeviceDetection,
  deleteDeviceDetection
};
