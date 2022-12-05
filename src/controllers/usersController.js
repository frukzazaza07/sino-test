
const controller = {},
    { query } = require('../db'),
    returnData = { status: true, message: [], results: [] },
    column = [
        'Name',
        'Surname',
        'Username',
        'Password',
        'Status',
    ];
const insertNew = async (data) => {
    // return new Promise(async (resolve) => {

    const sql = `INSERT INTO user (${column.join(',')}) VALUES (?)`;

    const results = await query(sql, [Object.values(data)]);
    // resolve(returnData);

    // })

}

const updateById = async (id, data) => {
    const sql = `UPDATE user SET ? WHERE UserID = ${id}`;
    const results = await query(sql, [data]);
    return results;
}

const deleteById = async (id) => {
    const sql = `UPDATE user SET Status = 'Delete' WHERE UserID = ${id}`;
    const results = await query(sql);
    return results;
}

const getAllUsers = async () => {
    const sql = `SELECT * FROM user WHERE Status != 'Delete'`;
    const results = await query(sql);
    return { data: results, jsonData: JSON.stringify(results) };
}
const getUserById = async (id) => {
    const sql = `SELECT * FROM user WHERE UserID = ${id}`;
    const results = await query(sql);
    return { user: results, jsonData: JSON.stringify(results) };
}

const getUserByUsernamePassword = async (username, password) => {
    console.log(username)
    console.log(password)
    const sql = `SELECT * FROM user WHERE username = ? AND password = ? `;
    const results = await query(sql, [username, password]);
    return { user: results, jsonData: JSON.stringify(results) };
}

controller.view = async (req, res) => {
    const results = await getAllUsers();
    results["action"] = "insert";
    res.render('users', results);
};

controller.add = async (req, res, next) => {
    const results = await insertNew(req.body);
    req.flash('success', 'Add new user successfully.');
    res.redirect('/users/');
    res.end();
};

controller.updateView = async (req, res, next) => {
    const { user } = await getUserById(req.params.id);
    const { data } = await getAllUsers(req.params.id, req.body);
    let userData = {};

    let returnData = {
        data: data,
        action: "update",
    }

    if (user.length > 0) {
        userData = {
            UserID: user[0].UserID,
            Name: user[0].Name,
            Surname: user[0].Surname,
            Username: user[0].Username,
            Password: user[0].Password,
            Status: user[0].Status,
        }
        returnData["user"] = userData;
        returnData["id"] = userData.UserID;
    }

    res.render('users', returnData);
    res.end();
};

controller.update = async (req, res, next) => {
    const results = await updateById(req.params.id, req.body);
    req.flash('success', 'Update user successfully.');
    res.redirect('/users/');
    res.end();
};

controller.delete = async (req, res, next) => {
    const results = await deleteById(req.params.id);
    req.flash('success', 'Delete user successfully.');
    res.redirect('/users/');
    res.end();
};


module.exports = {controller, getUserByUsernamePassword};
