const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users');

router.get('/', usersCtrl.getOne);
router.get('/all', usersCtrl.getAll);

router.post('/login', usersCtrl.login);
router.post('/signup', usersCtrl.signup);

router.get('/trip/one', usersCtrl.getOneTrip)
router.get('/trip/detail', usersCtrl.getTrip);

router.post('/create/trip', usersCtrl.createTrip);
router.post('/edit/trip', usersCtrl.editTrip);

router.post('/trip/save/hotel', usersCtrl.saveHotel);

// router.post('/trip/save/flight', usersCtrl.saveFlight);

module.exports = router;
