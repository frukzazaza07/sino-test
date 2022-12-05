
const controller = {},
{ query } = require('../db'),
{ getAllData: getAllDataProductCategory } = require('./productCategoryController'),
returnData = { status: true, message: [], results: [] },
column = [
    'Code',
    'ProductName',
    'Price',
    'CategoryID',
    'Status',
];
const insertNew = async (data) => {
// return new Promise(async (resolve) => {

const sql = `INSERT INTO product (${column.join(',')}) VALUES (?)`;

const results = await query(sql, [Object.values(data)]);
// resolve(returnData);

// })

}

const updateById = async (id, data) => {
const sql = `UPDATE product SET ? WHERE ProductID  = ${id}`;
const results = await query(sql, [data]);
return results;
}

const deleteById = async (id) => {
const sql = `UPDATE product SET Status = 'Delete' WHERE ProductID  = ${id}`;
const results = await query(sql);
return results;
}

const getAllData = async () => {
const sql = `SELECT * FROM product WHERE Status != 'Delete'`;
const results = await query(sql);
return { data: results, jsonData: JSON.stringify(results) };
}
const getDataById = async (id) => {
const sql = `SELECT * FROM product WHERE ProductID  IN(${id})`;
const results = await query(sql);
return { product: results, jsonData: JSON.stringify(results) };
}

controller.view = async (req, res) => {
const results = await getAllData();
const {data: productCategoryData} = await getAllDataProductCategory();
results["action"] = "insert";
results["dataCategory"] = productCategoryData;
res.render('product', results);
};

controller.add = async (req, res, next) => {
    console.log(req.body)
const results = await insertNew(req.body);
req.flash('success', 'Add new product  successfully.');
res.redirect('/product/');
res.end();
};

controller.updateView = async (req, res, next) => {
const { product } = await getDataById(req.params.id);
const { data } = await getAllData(req.params.id, req.body);
const {data: productCategoryData} = await getAllDataProductCategory();
let productData = {};

let returnData = {
    data: data,
    action: "update",
    dataCategory: productCategoryData,
}

if (product.length > 0) {
    productData = {
        ProductID: product[0].ProductID,
        Code: product[0].Code,
        ProductName: product[0].ProductName,
        CategoryID: product[0].CategoryID,
        Price: product[0].Price,
        Status: product[0].Status,
    }
    returnData["product"] = productData;
    returnData["id"] = productData.ProductID;
}

res.render('product', returnData);
res.end();
};

controller.update = async (req, res, next) => {
const results = await updateById(req.params.id, req.body);
req.flash('success', 'Update product  successfully.');
res.redirect('/product/');
res.end();
};

controller.delete = async (req, res, next) => {
const results = await deleteById(req.params.id);
req.flash('success', 'Delete product  successfully.');
res.redirect('/product/');
res.end();
};


module.exports = {controller, getAllData, getDataById};
