const express = require('express');
const router = express.Router();
const Validator = require('../validators/ItemsQueryValidator');
const Database = require('../database/Database');
const Utils = require('../Utils');

router.get('/insert', (req, res, next) => {
  if (Validator.isInsert(req.query)) {
    const item = Utils.getDetails(req.query);
    item.owner = req.query.facebookId;
    Database.insertItem(Utils.getAuth(req.query),
      item, response => res.send(response));
  } else {
    res.status(400);
    res.send({ success: false, message: 'invalid parameters' });
  }
});

router.get('/update', (req, res, next) => {
  if (Validator.isUpdate(req.query)) {
    Database.updateItem(Utils.getAuth(req.query),
      Utils.getDetails(req.query), response => res.send(response));
  } else {
    res.status(400);
    res.send({ success: false, message: 'invalid parameters' });
  }
});

router.get('/remove', (req, res, next) => {
  if (Validator.isRemove(req.query)) {
    Database.removeItem(Utils.getAuth(req.query),
      Utils.getDetails(req.query), response => res.send(response));
  } else {
    res.status(400);
    res.send({ success: false, message: 'invalid parameters' });
  }
});

module.exports = router;
