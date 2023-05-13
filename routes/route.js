const router = require('express').Router();

const { getbill } = require('../controller/appController.js')


/** HTTP Reqeust */
// router.post('/user/signup', signup);
router.post('/getbill', getbill);


module.exports = router;