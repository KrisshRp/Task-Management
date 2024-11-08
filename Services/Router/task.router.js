var router = require('express').Router();
var controller = require('../Controller/task.controller');

router.post('/create', controller.create, controller.read);
router.post('/update', controller.update, controller.read);
router.get('/delete/:id', controller.delete, controller.read);
router.get('/read', controller.read);
router.get('/read/:id', controller.read);
router.get('/history/:id', controller.read);

module.exports = router