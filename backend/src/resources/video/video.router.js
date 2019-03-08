const { Router } = require('express');

const controllers = require('./video.controllers');

const router = Router();

router.get('/:date', controllers.getOne);
router.post('/', controllers.createOne);

module.exports = router;
