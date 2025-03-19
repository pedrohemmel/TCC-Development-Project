const db = require('../service/dbConnection');

// Funções para a tabela Beacon_Locations
const getBeaconLocationById = async (id) => {
  console.log("\n\nopi" + id + "\n\n" )
  const query = 'SELECT * FROM Beacon_Locations WHERE local_beacon_id = ?';
  const [rows] = await db.execute(query, [id]);
  return rows.length ? rows[0] : null; // Retorna o primeiro resultado ou null se não encontrado
};

const getBeaconLocations = async () => {
  try {
    const [locations] = await db.execute('SELECT * FROM Beacon_Locations;');
    return locations;
  } catch (error) {
    console.error('Erro ao buscar localizações:', error);
    throw error;
  }
};

const addBeaconLocation = async (beacon_id, location_name) => {
  try {
    const [result] = await db.execute(
      'INSERT INTO Beacon_Locations (local_beacon_id, location_name) VALUES (?, ?);',
      [beacon_id, location_name]
    );
    return { insertId: result.insertId };
  } catch (error) {
    console.error('Erro ao adicionar localização do beacon:', error);
    throw error;
  }
};

const updateBeaconLocation = async (local_beacon_id, location_name) => {
  try {
    await db.execute(
      'UPDATE Beacon_Locations SET location_name = ? WHERE local_beacon_id = ?;',
      [location_name, local_beacon_id]
    );
    return { message: 'Localização do beacon atualizada com sucesso.' };
  } catch (error) {
    console.error('Erro ao atualizar localização do beacon:', error);
    throw error;
  }
};

const deleteBeaconLocation = async (local_beacon_id) => {
  try {
    await db.execute('DELETE FROM Beacon_Locations WHERE local_beacon_id = ?;', [local_beacon_id]);
    return { message: 'Localização do beacon deletada com sucesso.' };
  } catch (error) {
    console.error('Erro ao deletar localização do beacon:', error);
    throw error;
  }
};

module.exports = {
  getBeaconLocationById,
  getBeaconLocations,
  addBeaconLocation,
  updateBeaconLocation,
  deleteBeaconLocation
};
