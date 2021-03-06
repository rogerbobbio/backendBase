/*
RUTA: /api/mysql/customers
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
var controller = require('./customer.controller');

// Init
var app = express();

// getAllCustomers
app.get('/', validateJWT , controller.getAllCustomers);
// createCustomer
app.post('/', 
[
    validateJWT,
    check('lastname', 'The last name is mandatory').not().isEmpty(),
    check('document', 'The document is mandatory').not().isEmpty(),
    check('document_type', 'The document type is mandatory').not().isEmpty(),
    check('status', 'The status is mandatory').not().isEmpty(),
    validateFields
]
, controller.createCustomer);
// updateCustomer
app.put('/:id',
[    
    validateJWT,
    check('lastname', 'The last name is mandatory').not().isEmpty(),
    check('document', 'The document is mandatory').not().isEmpty(),
    check('document_type', 'The document type is mandatory').not().isEmpty(),
    check('status', 'The status is mandatory').not().isEmpty(),
    validateFields,
]
, controller.updateCustomer);
// deleteCustomer
app.delete('/:id', validateJWT, controller.deleteCustomer);
// searchCustomers
app.get('/search/:search', controller.searchCustomers);
// getCustomersByStatus
app.get('/search/bystatus/:status', controller.getCustomersByStatus);
// getCustomerInfo by id
app.get('/:id', validateJWT, controller.getCustomerInfo);

module.exports = app;