const model = require("../model/deviceModel.js")

const getDevices = async (_req, res) => {
    const payload = await model.getDevices()
    return res.status(200).json(payload)
}

const addNewDevice = async (req, res) => {
    const payload = await model.addNewDevice(req)
    return res.status(201).json(payload)
}

module.exports = {
    getDevices,
    addNewDevice
}