var express = require('express');
var memberController = require('../controllers/memberController');

module.exports = (app) => {
    var router = express.Router();

    router.get('/member', memberController.get);
    // router.post('/member', memberController.create);
    // router.put('/member', memberController.update);
    // router.delete('/member', memberController.delete);
    
    app.use('/api', router);
}
