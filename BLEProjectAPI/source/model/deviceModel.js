const db = require('../service/dbConnection.js')

const getDevices = async () => {
    const [model] = await db.execute('SELECT * FROM devices;')
    return model
}

module.exports = {
    getDevices
}