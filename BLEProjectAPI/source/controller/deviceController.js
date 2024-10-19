const model = require("../model/deviceModel.js")

const getDevices = async (_req, res) => {
    const payload = model.getDevices()
    return res.status(200).json(payload)
}

module.exports = {
    getDevices
}