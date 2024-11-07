const db = require('../service/dbConnection');

// Funções para a tabela Devices
const getDeviceById = async (id_device) => {
  const query = 'SELECT * FROM Devices WHERE id_device = ?';
  const [rows] = await db.execute(query, [id_device]);
  return rows.length ? rows[0] : null; 
};

const getDevices = async () => {
  try {
    const [devices] = await db.execute('SELECT * FROM Devices;');
    return devices;
  } catch (error) {
    console.error('Erro ao buscar dispositivos:', error);
    throw error;
  }
};

const addDevice = async (id_device, first_seen, last_seen) => {
  try {
    const [result] = await db.execute(
      'INSERT INTO Devices (id_device, first_seen, last_seen) VALUES (?, ?, ?);', 
      [id_device, first_seen, last_seen]
    );
    return { insertId: result.insertId };
  } catch (error) {
    console.error('Erro ao adicionar dispositivo:', error);
    throw error;
  }
};

const updateDevice = async (id_device, last_seen) => {
  try {
    await db.execute(
      'UPDATE Devices SET last_seen = ? WHERE id_device = ?;',
      [last_seen, id_device]
    );
    return { message: 'Dispositivo atualizado com sucesso.' };
  } catch (error) {
    console.error('Erro ao atualizar dispositivo:', error);
    throw error;
  }
};

const deleteDevice = async (id_device) => {
  try {
    await db.execute('DELETE FROM Devices WHERE id_device = ?;', [id_device]);
    return { message: 'Dispositivo deletado com sucesso.' };
  } catch (error) {
    console.error('Erro ao deletar dispositivo:', error);
    throw error;
  }
};

module.exports = {
  getDeviceById,
  getDevices,
  addDevice,
  updateDevice,
  deleteDevice
};
