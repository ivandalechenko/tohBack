const Router = require('express').Router;
const tweetsController = require('./tweets-controller');
const router = new Router();

// router.post('/', tweetsController.set); 
router.get('/', tweetsController.get);
router.get('/check', (req, res) => res.json('ok'));

module.exports = router;