const express = require('express');
const itemController = require('../controller/itemController');
const categoryController = require('../controller/categoryController');
const router = express.Router();

//Items
router.get('/items', itemController.getItems);
router.get('/item/:id', itemController.getItem);
router.post('/item', itemController.addItem);
router.delete('/item/:id', itemController.deleteItem);
router.put('/item/:id', itemController.updateItem);

//Categories
router.get('/categories', categoryController.getCategories);
router.get('/category/:id', categoryController.getCategory);
router.post('/category', categoryController.addCategory);
router.delete('/category/:id', categoryController.deleteCategory);
router.put('/category/:id', categoryController.updateCategory);

module.exports = router