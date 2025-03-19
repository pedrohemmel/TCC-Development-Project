const express = require('express');

// Importando os controladores
const deviceController = require('./controller/devicesController');
const beaconLocationsController = require('./controller/beaconLocationsController');
const deviceDetectionsController = require('./controller/deviceDetectionsController');
const eventsAlertsController = require('./controller/eventsAlertsController');
const eventsController = require('./controller/eventsController');

const router = express.Router();

// Rotas para o controlador de Devices
router.post('/device', deviceController.getDeviceById)
router.get('/devices', deviceController.getDevices);
router.post('/devices', deviceController.addDevices);
router.put('/devices', deviceController.updateDevice);
router.delete('/devices/:id_device', deviceController.deleteDevice);

// Rotas para o controlador de Beacon_Locations
router.get('/beacon-locations', beaconLocationsController.getBeaconLocations);
router.post('/beacon-location', beaconLocationsController.getBeaconLocationById);
router.post('/beacon-locations', beaconLocationsController.addBeaconLocations);
router.put('/beacon-locations', beaconLocationsController.updateBeaconLocation);
router.delete('/beacon-locations/:local_beacon_id', beaconLocationsController.deleteBeaconLocation);

// Rotas para o controlador de Device_Detections
router.get('/device-detections', deviceDetectionsController.getDeviceDetections);
router.post('/device-detections', deviceDetectionsController.addDeviceDetections);
router.delete('/device-detections/:detection_id', deviceDetectionsController.deleteDeviceDetection);

// Rotas para o controlador de Events_Alerts
router.get('/events-alerts', eventsAlertsController.getEventsAlerts);
router.post('/events-alerts', eventsAlertsController.addEventsAlerts);
router.put('/events-alerts', eventsAlertsController.updateEventAlert);
router.delete('/events-alerts/:event_id', eventsAlertsController.deleteEventAlert);

// Rotas para o controlador de Events
router.get('/events', eventsController.getEvents);
router.post('/events', eventsController.addEvent);
router.put('/events', eventsController.updateEvent);
router.delete('/events/:event_id', eventsController.deleteEvent);

module.exports = router;
