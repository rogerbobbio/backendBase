const dataAccess = require('./supplier.DAL');

function getSupplierByName(name) {    
    return dataAccess.getSupplierByName(name)
    .then(function(res){
        if(res.length > 0) { return res[0]; }
        return null;
    });
}

function getSupplierByRuc(ruc) {    
    return dataAccess.getSupplierByRuc(ruc)
    .then(function(res){
        if(res.length > 0) { return res[0]; }
        return null;
    });
}

function getSupplierInfoById(supplierId) {
    return dataAccess.getSupplierInfoById(supplierId)
    .then(function(res){
        if(res.length > 0) { return res[0]; }
        return null;
    });
}

function getAllSuppliers() {
    return dataAccess.getAllSuppliers()
    .then(function(res){
        return res;
    });
}

function getSuppliersByStatus(status) {
    return dataAccess.getSuppliersByStatus(status)
    .then(function(res){
        return res;
    });
}

function searchSuppliers(searchValue) {
    return dataAccess.searchSuppliers(searchValue)
    .then(function(res){
        return res;
    });    
}

function createSupplier(name ,ruc, address, phone, fax, web, email, contact, status, user_create) {
    return dataAccess.createSupplier(name ,ruc, address, phone, fax, web, email, contact, status, user_create)
    .then(function(res){
        return res;
    });    
}

function updateSupplier(supplierId, req) {
    return dataAccess.updateSupplier(supplierId, req)
    .then(function(res){
        return res;
    });    
}

function deleteSupplier(supplierId) {
    return dataAccess.deleteSupplier(supplierId)
    .then(function(res){
        return res;
    });    
}

module.exports = {
    getSupplierByName,
    getSupplierInfoById,
    getAllSuppliers,
    getSuppliersByStatus,
    searchSuppliers,
    createSupplier,
    updateSupplier,
    deleteSupplier,
    getSupplierByRuc
}