
const controller = {},
    { query } = require('../db'),
    { getAllData: getAllDataProductCategory } = require('./productCategoryController'),
    { getAllData: getAllDataProduct, getDataById: getProductById } = require('./productController'),
    { getAllData: getAllDataCustomer } = require('./customersController'),
    returnData = { status: true, message: [], results: [] },
    column = [
        'UserID',
        'Total_Price',
        'CusID',
        'Status',
    ],
    columnOrderItems = [
        'OrderID',
        'ProductID',
        'CusID',
        'Price',
        'Amount',
        'Total_Price',
        'Status',
    ];
const insertNew = async (data) => {
    // return new Promise(async (resolve) => {

    const sql = `INSERT INTO orders (${column.join(',')}) VALUES (?)`;

    const results = await query(sql, [data]);
    return results.insertId;
    // resolve(returnData);

    // })

}
const insertNewOrderItems = async (data) => {
    // return new Promise(async (resolve) => {

    const sql = `INSERT INTO order_item (${columnOrderItems.join(',')}) VALUES ?`;

    const results = await query(sql, [data]);
    return results.insertId;
    // resolve(returnData);

    // })

}

const updateById = async (id, data) => {
    const sql = `UPDATE orders SET ? WHERE OrderID  = ${id}`;
    const results = await query(sql, [data]);
    return results;
}

const deleteById = async (id) => {
    const sql = `UPDATE orders SET Status = 'Delete' WHERE OrderID  = ${id}`;
    const results = await query(sql);
    return results;
}

const getAllData = async () => {
    const sql = `SELECT * FROM orders WHERE Status = 'Active'`;
    const results = await query(sql);
    return { data: results, jsonData: JSON.stringify(results) };
}
const getDataById = async (id) => {
    const sql = `SELECT * FROM orders WHERE OrderID  = ${id}`;
    const results = await query(sql);
    return { order: results, jsonData: JSON.stringify(results) };
}

const setDataInsertOrderItems = (orderId, employeeId, cusId, productData) => {
    let insertData = [];
    for (const [key, value] of Object.entries(productData)) {
        const totalPrice = parseFloat(value.Price) * parseInt(value.amount);
        insertData.push([orderId, value.ProductID, cusId, value.Price, value.amount, totalPrice, 'Active']);
    }
    return insertData;
}

const calTotalPrice = async (productInOrder) => {
    let productIdInOrder = [];
    let totalPrice = 0;
    let productPriceSum = 0;
    let productPriceSumDb = 0;
    let totalPriceDb = 0;
    let mapProductDataFromDb = {};
    let returnData = { isValidPrice: true, totalPrice: 0, totalPriceDb: 0, productPriceSum: 0, productPriceSumDb: 0 };
    for (const [key, value] of Object.entries(productInOrder)) {
        productIdInOrder.push(value.ProductID);
        totalPrice += parseFloat(value.Price) * parseInt(value.amount)
        productPriceSum += parseFloat(value.Price);
        mapProductDataFromDb[key] = value;
    }

    const productData = await getProductById(productIdInOrder.join(","));

    for (let item of productData.product) {
        productPriceSumDb += item.Price;
        mapProductDataFromDb[`p-${item.ProductID}`].Price = item.Price;
        let totalPrice = mapProductDataFromDb[`p-${item.ProductID}`].Price * mapProductDataFromDb[`p-${item.ProductID}`].amount;
        totalPriceDb += totalPrice;
    }

    if (productPriceSum != productPriceSumDb) {
        returnData.isValidPrice = false;
    }

    returnData.totalPrice = totalPrice;
    returnData.totalPriceDb = totalPriceDb;
    returnData.productPriceSum = productPriceSum;
    returnData.productPriceSumDb = productPriceSumDb;
    return returnData
}

controller.view = async (req, res) => {
    const results = await getAllData();
    const { data: productCategoryData } = await getAllDataProductCategory();
    const { data: productData } = await getAllDataProduct();
    const { data: customerData } = await getAllDataCustomer();
    const productProvide = [];
    let i = 0;
    for (let item of productData) {
        productProvide.push(item);
        productProvide[i]["isSelect"] = false;
        productProvide[i]["amount"] = 1;
        productProvide[i]["salePrice"] = item.Price;
        productProvide[i]["sumTotalPrice"] = 0;
        productProvide[i]["deleteItem"] = false;
        i++;
    }
    results["action"] = "insert";
    results["employeeId"] = req.session.userData.id;
    if (productCategoryData.length > 0) results["dataCategory"] = productCategoryData;
    if (productData.length > 0) results["productCategoryAll"] = JSON.stringify(productCategoryData);
    if (productData.length > 0) results["productAll"] = JSON.stringify(productProvide);
    if (customerData.length > 0) results["customerAll"] = JSON.stringify(customerData);

    res.render('order', results);
};

controller.add = async (req, res, next) => {
    // console.log(req.body);
    const productInOrder = req.body.order.productOrder;
    const countItemInOrder = req.body.order.countItemInOrder;
    const customerId = (req.body.order.customerData.length > 0 ? customerId.CusID : null);
    const employeeId = req.body.order.employeeId;
    const checkPrice = await calTotalPrice(productInOrder);
    const insertData = [employeeId, checkPrice.totalPriceDb, customerId, 'Active']

    if (checkPrice.isValidPrice == false) {
        res.json({ status: 'success', message: 'Add order, Please add order again.' });
        return;
    }

    const orderInsertId = await insertNew(insertData);
    const dataInsertOrderItems = setDataInsertOrderItems(orderInsertId, employeeId, customerId, productInOrder);
    const orderItems = await insertNewOrderItems(dataInsertOrderItems);

    res.json({ status: 'success', message: 'Add new order successfully.' });
    res.end();
};


controller.update = async (req, res, next) => {
    const results = await updateById(req.params.id, req.body);
    req.flash('success', 'Update order  successfully.');
    res.redirect('/pos/');
    res.end();
};

controller.delete = async (req, res, next) => {
    const results = await deleteById(req.params.id);
    req.flash('success', 'Delete order  successfully.');
    res.redirect('/pos/');
    res.end();
};


module.exports = controller;
