const db = require('../service/dbConnection');  // Importando a conexão correta

// Função para obter todos os dispositivos
const getDevices = async () => {
  try {
    const [model] = await db.execute('SELECT * FROM devices;');
    return model;
  } catch (error) {
    console.error('Erro ao buscar dispositivos:', error);
    throw error;
  }
};

const addNewDevice = async (req) => {
  const { local_name, device_id } = req.body;
  const date = new Date();

  try {
    const [createdDevice] = await db.execute(
      'INSERT INTO devices (local_name, device_id, register_time) VALUES (?, ?, ?)', 
      [local_name, device_id, date]
    );
    return { insertId: createdDevice.insertId };
  } catch (error) {
    console.error('Erro ao adicionar dispositivo:', error);
    throw error;
  }
};

module.exports = {
  getDevices,
  addNewDevice
};
