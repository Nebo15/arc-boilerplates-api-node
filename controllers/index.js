import express from 'express';

let router = express.Router();

router.get('/', function(req, res) {
  res.render('user', {"id": 123, name: "Test", avatar: "http://link", hidden_field: "can't see me!"});
});

router.all('/test', function(req, res) {
  let a = "Route description";
});


export default router;
