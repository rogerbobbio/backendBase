const dataAccess = require('./customer.DAL');

function getCustomerByDocument(document) {    
    return dataAccess.getCustomerByDocument(document)
    .then(function(res){
        if(res.length > 0) { return res[0]; }
        return null;
    });
}

function getCustomerInfoById(customerId) {
    return dataAccess.getCustomerInfoById(customerId)
    .then(function(res){
        if(res.length > 0) { return res[0]; }
        return null;
    });
}

function getAllCustomers() {
    return dataAccess.getAllCustomers()
    .then(function(res){
        return res;
    });
}

function getCustomersByStatus(status) {
    return dataAccess.getCustomersByStatus(status)
    .then(function(res){
        return res;
    });
}

function searchCustomers(searchValue) {
    return dataAccess.searchCustomers(searchValue)
    .then(function(res){
        return res;
    });    
}

function createCustomer(lastname, names, address, phone, document, document_type, email, status, user_create) {
    return dataAccess.createCustomer(lastname, names, address, phone, document, document_type, email, status, user_create)
    .then(function(res){
        return res;
    });    
}

function updateCustomer(customerId, req) {
    return dataAccess.updateCustomer(customerId, req)
    .then(function(res){
        return res;
    });    
}

function deleteCustomer(customerId) {
    return dataAccess.deleteCustomer(customerId)
    .then(function(res){
        return res;
    });    
}

module.exports = {
    getCustomerByDocument,
    getCustomerInfoById,
    getAllCustomers,
    getCustomersByStatus,
    searchCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer
}