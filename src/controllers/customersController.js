
const controller = {},
{ query } = require('../db'),
returnData = { status: true, message: [], results: [] },
column = [
    'Name',
    'Surname',
    'Status',
];
const insertNew = async (data) => {
// return new Promise(async (resolve) => {

const sql = `INSERT INTO customer (${column.join(',')}) VALUES (?)`;

const results = await query(sql, [Object.values(data)]);
// resolve(returnData);

// })

}

const updateById = async (id, data) => {
const sql = `UPDATE customer SET ? WHERE CusID = ${id}`;
const results = await query(sql, [data]);
return results;
}

const deleteById = async (id) => {
const sql = `UPDATE customer SET Status = 'Delete' WHERE CusID = ${id}`;
const results = await query(sql);
return results;
}

const getAllData = async () => {
const sql = `SELECT * FROM customer WHERE Status != 'Delete'`;
const results = await query(sql);
return { data: results, jsonData: JSON.stringify(results) };
}
const getDataById = async (id) => {
const sql = `SELECT * FROM customer WHERE CusID = ${id}`;
const results = await query(sql);
return { customer: results, jsonData: JSON.stringify(results) };
}

controller.view = async (req, res) => {
const results = await getAllData();
results["action"] = "insert";
res.render('customers', results);
};

controller.add = async (req, res, next) => {
const results = await insertNew(req.body);
req.flash('success', 'Add new customer successfully.');
res.redirect('/customers/');
res.end();
};

controller.search = async (req, res, next) => {
const results = await getDataById(req.body.CusID);
res.json(results.customer);
res.end();
};

controller.updateView = async (req, res, next) => {
const { customer } = await getDataById(req.params.id);
const { data } = await getAllData(req.params.id, req.body);
let customerData = {};

let returnData = {
    data: data,
    action: "update",
}

if (customer.length > 0) {
    customerData = {
        CusID: customer[0].CusID,
        Name: customer[0].Name,
        Surname: customer[0].Surname,
        Status: customer[0].Status,
    }
    returnData["customer"] = customerData;
    returnData["id"] = customerData.CusID;
}

res.render('customers', returnData);
res.end();
};

controller.update = async (req, res, next) => {
const results = await updateById(req.params.id, req.body);
req.flash('success', 'Update customer successfully.');
res.redirect('/customers/');
res.end();
};

controller.delete = async (req, res, next) => {
const results = await deleteById(req.params.id);
req.flash('success', 'Delete customer successfully.');
res.redirect('/customers/');
res.end();
};


module.exports = {controller, getAllData};
