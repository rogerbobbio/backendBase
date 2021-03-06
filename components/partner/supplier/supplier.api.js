/*
RUTA: /api/mysql/suppliers
*/

/*
NOTA:
1. DAL
2. Service
3. Controller
4. API
*/

// Requires
var express = require('express');
var { check } = require('express-validator');
const { validateFields } = require('../../../middlewares/validate-fields');
const { validateJWT } = require('../../../middlewares/validate-jwt');
var controller = require('./supplier.controller');

// Init
var app = express();

// getAllSuppliers
app.get('/', validateJWT , controller.getAllSuppliers);
// createSupplier
app.post('/', 
[
    validateJWT,
    check('name', 'The description is mandatory').not().isEmpty(),
    check('ruc', 'The description is mandatory').not().isEmpty(),
    check('status', 'The status is mandatory').not().isEmpty(),
    validateFields
]
, controller.createSupplier);
// updateSupplier
app.put('/:id',
[    
    validateJWT,
    check('name', 'The description is mandatory').not().isEmpty(),
    check('ruc', 'The description is mandatory').not().isEmpty(),
    check('status', 'The status is mandatory').not().isEmpty(),
    validateFields,
]
, controller.updateSupplier);
// deleteSupplier
app.delete('/:id', validateJWT, controller.deleteSupplier);
// searchSuppliers
app.get('/search/:search', controller.searchSuppliers);
// getSuppliersByStatus
app.get('/search/bystatus/:status', controller.getSuppliersByStatus);
// getSupplierInfo by id
app.get('/:id', validateJWT, controller.getSupplierInfo);

module.exports = app;