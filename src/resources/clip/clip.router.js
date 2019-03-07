const express = require('express')

const controllers = require('./clip.controllers')

const router = express.Router()

router.get('/:date', controllers.getMany)

module.exports = router;