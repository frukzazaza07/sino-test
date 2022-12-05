
const controller = {},
    { query } = require('../db'),
    returnData = { status: true, message: [], results: [] },
    column = [
        'Code',
        'CategoryName',
        'Status',
    ];
const insertNew = async (data) => {
    // return new Promise(async (resolve) => {

    const sql = `INSERT INTO product_category (${column.join(',')}) VALUES (?)`;

    const results = await query(sql, [Object.values(data)]);
    // resolve(returnData);

    // })

}

const updateById = async (id, data) => {
    const sql = `UPDATE product_category SET ? WHERE CategoryID  = ${id}`;
    const results = await query(sql, [data]);
    return results;
}

const deleteById = async (id) => {
    const sql = `UPDATE product_category SET Status = 'Delete' WHERE CategoryID  = ${id}`;
    const results = await query(sql);
    return results;
}

const getAllData = async () => {
    const sql = `SELECT * FROM product_category WHERE Status != 'Delete'`;
    const results = await query(sql);
    return { data: results, jsonData: JSON.stringify(results) };
}
const getDataById = async (id) => {
    const sql = `SELECT * FROM product_category WHERE CategoryID  = ${id}`;
    const results = await query(sql);
    return { productCategory: results, jsonData: JSON.stringify(results) };
}

controller.view = async (req, res) => {
    const results = await getAllData();
    results["action"] = "insert";
    res.render('productCategory', results);
};

controller.add = async (req, res, next) => {
    const results = await insertNew(req.body);
    req.flash('success', 'Add new product category successfully.');
    res.redirect('/product-category/');
    res.end();
};

controller.updateView = async (req, res, next) => {
    const { productCategory } = await getDataById(req.params.id);
    const { data } = await getAllData(req.params.id, req.body);
    let productCategoryData = {};

    let returnData = {
        data: data,
        action: "update",
    }

    if (productCategory.length > 0) {
        productCategoryData = {
            CategoryID: productCategory[0].CategoryID,
            Code: productCategory[0].Code,
            CategoryName: productCategory[0].CategoryName,
            Status: productCategory[0].Status,
        }
        returnData["productCategory"] = productCategoryData;
        returnData["id"] = productCategoryData.CategoryID;
    }

    res.render('productCategory', returnData);
    res.end();
};

controller.update = async (req, res, next) => {
    const results = await updateById(req.params.id, req.body);
    req.flash('success', 'Update product category successfully.');
    res.redirect('/product-category/');
    res.end();
};

controller.delete = async (req, res, next) => {
    const results = await deleteById(req.params.id);
    req.flash('success', 'Delete product category successfully.');
    res.redirect('/product-category/');
    res.end();
};

// exports.method = getAllData;
module.exports = {controller, getAllData};
