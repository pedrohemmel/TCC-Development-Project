const model = require('../model/beaconLocationsModel');

const getBeaconLocationById = async (req, res) => {
    const { id } = req.body;
    try {
        const payload = await model.getBeaconLocationById(id);
        if (!payload) {
            return res.status(404).json({ message: 'Localização não encontrada' });
        }
        return res.status(200).json(payload);
    } catch (error) {
        console.error('Erro ao buscar localização:', error);
        return res.status(500).json({ message: 'Erro ao buscar localização' });
    }
};

const getBeaconLocations = async (_req, res) => {
    try {
        const payload = await model.getBeaconLocations();
        return res.status(200).json(payload);
    } catch (error) {
        console.error('Erro ao buscar localizações:', error);
        return res.status(500).json({ message: 'Erro ao buscar localizações' });
    }
};

const addBeaconLocations = async (req, res) => {
    const locations = req.body;
    try {
        const results = [];
        for (const location of locations) {
            const { location_name, beacon_id } = location;
            const result = await model.addBeaconLocation(beacon_id, location_name);
            results.push(result);
        }
        return res.status(201).json(results);
    } catch (error) {
        console.error('Erro ao adicionar localizações:', error);
        return res.status(500).json({ message: 'Erro ao adicionar localizações' });
    }
};

const updateBeaconLocation = async (req, res) => {
    const { local_beacon_id, location_name } = req.body;
    try {
        const payload = await model.updateBeaconLocation(local_beacon_id, location_name);
        return res.status(200).json(payload);
    } catch (error) {
        console.error('Erro ao atualizar localização:', error);
        return res.status(500).json({ message: 'Erro ao atualizar localização' });
    }
};

const deleteBeaconLocation = async (req, res) => {
    const { local_beacon_id } = req.params;
    try {
        const payload = await model.deleteBeaconLocation(local_beacon_id);
        return res.status(200).json(payload);
    } catch (error) {
        console.error('Erro ao deletar localização:', error);
        return res.status(500).json({ message: 'Erro ao deletar localização' });
    }
};

module.exports = {
    getBeaconLocationById,
    getBeaconLocations,
    addBeaconLocations,
    updateBeaconLocation,
    deleteBeaconLocation
};
