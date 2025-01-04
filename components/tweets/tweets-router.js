const Router = require('express').Router;
const tweetsController = require('./tweets-controller');
const router = new Router();

// router.post('/', tweetsController.set); 
router.get('/', tweetsController.get);

module.exports = router;