/*
RUTA: /api/mysql
*/

const router = require('express').Router();

// Test MySQL DB
router.use('/', require('./root/root.api'));
// Users
router.use('/users', require('./user/user.api'));
// Login
router.use('/login', require('./login/login.api'));
// Upload files
router.use('/uploads', require('./uploads/uploads.api'));
// User Roles
router.use('/userRoles', require('./userRole/userRole.api'));
// modules
router.use('/modules', require('./systemModule/systemModule.api'));
// screens
router.use('/screens', require('./systemScreen/systemScreen.api'));
// permissions
router.use('/permissions', require('./systemPermission/systemPermission.api'));
// systemConfig
router.use('/systemConfig', require('./systemConfig/systemConfig.api'));




//CUSTOMER Y SUPPLIER  =========================================================
// customers
router.use('/customers', require('./partner/customer/customer.api'));
// suppliers
router.use('/suppliers', require('./partner/supplier/supplier.api'));


module.exports = router