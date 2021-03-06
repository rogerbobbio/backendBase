/*
MYSQL Controller for Supplier
*/

var service = require('./supplier.service');

async function getSupplierInfo(req, res) {
    var supplierId = req.params.id;

    service.getSupplierInfoById(supplierId)
    .then(function(supplier) {
      if(!supplier){
        return res.status(404).json({
          ok:false,
          msg: `Supplier Id ${supplierId} was not found`
        });
      }
       
      res.send({
        ok: true,
        supplier
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

async function getAllSuppliers(req, res) {

  service.getAllSuppliers()
  .then(function(suppliers) {

    const totalRecords = suppliers.length;
         
    res.send({
      ok: true,
      totalRecords,
      suppliers,      
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

async function createSupplier(req, res) {
  
  const uid = req.uid;
  req.body.user_create = uid;

  const { name ,ruc, address, phone, fax, web, email, contact, status, user_create } = req.body;

  service.getSupplierByName(name)
  .then(function(supplier) {

      if (supplier === null) {


        service.createSupplier(name ,ruc, address, phone, fax, web, email, contact, status, user_create)
        .then(function(supplier) {
                    
          res.send({
            ok: true,
            supplierId: supplier.insertId            
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
            msg: 'Name already registered.'
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

async function updateSupplier(req, res) {

    const uid = req.uid;
    req.body.user_update = uid;
    req.body.update_date = new Date();

    var supplierId = req.params.id;
    try {

      const supplier = await service.getSupplierInfoById(supplierId);

      if(!supplier){             
        return res.status(400).json({
            ok:false,
            msg: `Supplier Id ${supplierId} was not found.`
        });
      } else {

        const { name, ruc } = req.body;

        var supplierByName = null;
        var supplierByRuc = null;

        if(supplier.name !== name) {
            supplierByName = await service.getSupplierByName(name);
        }

        if(supplier.ruc !== ruc) {
            supplierByRuc = await service.getSupplierByRuc(ruc);
          }

        if (supplierByName !== null || supplierByRuc !== null) {
        return res.status(400).json({
            ok:false,
            msg: `There is already a supplier with that name or ruc `
        });
        } else {
        
          service.updateSupplier(supplierId, req)
            .then(function(supplier) {
                  
              res.send({
                ok: true,
                affectedRows: supplier.affectedRows
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

async function deleteSupplier(req, res) {

  var supplierId = req.params.id;

  service.getSupplierInfoById(supplierId)
  .then(function(supplier) {
    if(!supplier){
        return res.status(400).json({
            ok:false,
            msg: `Supplier Id ${supplierId} was not found.`
        });
    }    
    
    service.deleteSupplier(supplierId)
      .then(function(supplier) {
            
        res.send({
          ok: true,
          affectedRows: supplier.affectedRows
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

async function searchSuppliers(req, res) {
  var searchValue = req.params.search;

  service.searchSuppliers(searchValue)
  .then(function(suppliers) {

    const totalRecords = suppliers.length;
         
    res.send({
      ok: true,
      totalRecords,
      suppliers
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

async function getSuppliersByStatus(req, res) {
  var status = req.params.status;

  service.getSuppliersByStatus(status)
  .then(function(suppliers) {

    const totalRecords = suppliers.length;
         
    res.send({
      ok: true,
      totalRecords,
      suppliers
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
    getSupplierInfo,
    getAllSuppliers,
    createSupplier,
    updateSupplier,
    deleteSupplier,
    searchSuppliers,
    getSuppliersByStatus
}