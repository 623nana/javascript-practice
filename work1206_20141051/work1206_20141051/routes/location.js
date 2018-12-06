var express = require('express');
var router = express.Router();
var client = require('../db_connection');


// GET - /tracker
router.get('/tracker', function (request, response) {
    // Tracker.html ������ �����մϴ�.
    response.render('Tracker');
  });

// GET - /observer
router.get('/observer', function (request, response) {
    response.render('observer');
});
  // GET - /ShowData
  router.get('/showdata', function (request, response) {
    // �����ͺ��̽��� �����͸� �����մϴ�.
    client.query('SELECT * FROM locations WHERE name=?', [request.query.name],
        function (error, data) {
          response.send(data);
        });
  });

module.exports = router;
