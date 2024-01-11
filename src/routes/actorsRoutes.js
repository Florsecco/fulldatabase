const express = require('express');
const router = express.Router();
const actorsController = require('../controllers/actorsController');

router.get('/actors', actorsController.list);

router.get('/actors/detail/:id', actorsController.detail);

router.get('/actors/add', actorsController.add);
router.post('/actors/create', actorsController.create);

module.exports= router