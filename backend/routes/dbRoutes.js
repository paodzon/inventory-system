const express = require('express');
const dbController = require('../controller/dbController');
const router = express.Router();

router.get('/createdb', dbController.createdb);
router.get('/createtable', dbController.createTable);
router.get('/createcategory', dbController.createCategory)

module.exports = router;