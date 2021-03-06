/*
MYSQL Controller for Customer
*/

var service = require('./customer.service');

async function getCustomerInfo(req, res) {
    var customerId = req.params.id;

    service.getCustomerInfoById(customerId)
    .then(function(customer) {
      if(!customer){
        return res.status(404).json({
          ok:false,
          msg: `Customer Id ${customerId} was not found`
        });
      }
       
      res.send({
        ok: true,
        customer
      });
    })
    .catch((err) => setImmediate(() => { 
      console.log(Date() + '\n' + err)
      res.status(err.status || 500).json({
        ok: false,
        value: err
      })
    }));
}

async function getAllCustomers(req, res) {

  service.getAllCustomers()
  .then(function(customers) {

    const totalRecords = customers.length;
         
    res.send({
      ok: true,
      totalRecords,
      customers,      
    });
  })
  .catch((err) => setImmediate(() => { 
    console.log(Date() + '\n' + err)
    res.status(err.status || 500).json({
      ok: false,
      value: err
    })
  }));
}

async function createCustomer(req, res) {
  
  const uid = req.uid;
  req.body.user_create = uid;

  const { lastname, names, address, phone, document, document_type, email, status, user_create } = req.body;

  service.getCustomerByDocument(document)
  .then(function(customer) {

      if (customer === null) {


        service.createCustomer(lastname, names, address, phone, document, document_type, email, status, user_create)
        .then(function(customer) {
                    
          res.send({
            ok: true,
            customerId: customer.insertId            
          });
        })
        .catch((err) => setImmediate(() => { 
            console.log(Date() + '\n' + err)
            res.status(err.status || 500).json({
                ok: false,
                value: err
            })
        }));

      } else  {
        return res.status(400).json({
            ok:false,
            msg: 'Document already registered.'
        });
      }

  })
  .catch((err) => setImmediate(() => { 
    console.log(Date() + '\n' + err)
    res.status(err.status || 500).json({
      ok: false,
      value: err
    })
  }));
}

async function updateCustomer(req, res) {

    const uid = req.uid;
    req.body.user_update = uid;
    req.body.update_date = new Date();

    var customerId = req.params.id;
    try {

      const customer = await service.getCustomerInfoById(customerId);

      if(!customer){             
        return res.status(400).json({
            ok:false,
            msg: `Customer Id ${customerId} was not found.`
        });
      } else {

        const { document } = req.body;

        var customerInfo = null;

        if(customer.document !== document) {
            customerInfo = await service.getCustomerByDocument(document);
        }

        if (customerInfo !== null) {
            return res.status(400).json({
                ok:false,
                msg: `There is already a customer with that document `
            });
        } else {
        
          service.updateCustomer(customerId, req)
            .then(function(customer) {
                  
              res.send({
                ok: true,
                affectedRows: customer.affectedRows
              });
            })
            .catch((err) => setImmediate(() => { 
              console.log(Date() + '\n' + err)
              res.status(err.status || 500).json({
                ok: false,
                value: err
              })
            })); 

        }

      }

    } catch (error) {
      console.log('TRY:' + Date() + '\n' + error)
            res.status(error.status || 500).json({
              ok: false,
              value: error
            })
    }
  
}

async function deleteCustomer(req, res) {

  var customerId = req.params.id;

  service.getCustomerInfoById(customerId)
  .then(function(customer) {
    if(!customer){
        return res.status(400).json({
            ok:false,
            msg: `Customer Id ${customerId} was not found.`
        });
    }    
    
    service.deleteCustomer(customerId)
      .then(function(customer) {
            
        res.send({
          ok: true,
          affectedRows: customer.affectedRows
        });
      })
      .catch((err) => setImmediate(() => { 
        console.log(Date() + '\n' + err)
        res.status(err.status || 500).json({
          ok: false,
          value: err
        })
      })); 
    
  })
  .catch((err) => setImmediate(() => { 
    console.log(Date() + '\n' + err)
    res.status(err.status || 500).json({
      ok: false,
      value: err
    })
  }));        

}

async function searchCustomers(req, res) {
  var searchValue = req.params.search;

  service.searchCustomers(searchValue)
  .then(function(customers) {

    const totalRecords = customers.length;
         
    res.send({
      ok: true,
      totalRecords,
      customers
    });
  })
  .catch((err) => setImmediate(() => { 
    console.log(Date() + '\n' + err)
    res.status(err.status || 500).json({
      ok: false,
      value: err
    })
  }));
}

async function getCustomersByStatus(req, res) {
  var status = req.params.status;

  service.getCustomersByStatus(status)
  .then(function(customers) {

    const totalRecords = customers.length;
         
    res.send({
      ok: true,
      totalRecords,
      customers
    });
  })
  .catch((err) => setImmediate(() => { 
    console.log(Date() + '\n' + err)
    res.status(err.status || 500).json({
      ok: false,
      value: err
    })
  }));
}

module.exports = {
    getCustomerInfo,
    getAllCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    searchCustomers,
    getCustomersByStatus
}