const express = require('express')
const router = express.Router()
const usersCtrl = require('../../controllers/api/users')

router.get('/', usersCtrl.getOne)
router.get('/all', usersCtrl.getAll)


router.post('/create/trip', usersCtrl.createTrip)
router.post('/edit/trip', usersCtrl.editTrip)
router.post('/login', usersCtrl.login)
router.post('/signup', usersCtrl.signup)



module.exports = router;