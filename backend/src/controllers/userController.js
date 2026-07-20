const userService = require("../services/userService");

async function getUsers(req, res) {
    try {
        const users = await userService.getUsers();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Ошибка получения пользователей",
        });
    }
}

async function createUser(req, res) {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Ошибка создания пользователя",
        });
    }
}

module.exports = {
    getUsers,
};

module.exports = {
    getUsers,
    createUser,
};