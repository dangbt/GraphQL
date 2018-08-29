var express = require('express');
var projectController = require('../controllers/projectController');

module.exports = (app) => {
    var router = express.Router();

    // router.get('/project', projectController.get);
    // router.post('/project', projectController.create);
    // router.put('/project', projectController.update);
    // router.delete('/project', projectController.delete);
    
    app.use('/api', router);
}
