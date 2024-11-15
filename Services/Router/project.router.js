var router = require('express').Router();
var controller = require('../Controller/project.controller');

router.post('/create', controller.create, controller.read);
router.post('/update', controller.update, controller.read);
router.post('/delete', controller.delete, controller.read);
router.get('/read', controller.read);
router.get('/read/:id', controller.read);

module.exports = router