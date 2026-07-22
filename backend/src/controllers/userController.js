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

const getUserByUsername = async (req, res) => {
    try {
        const user = await userService.getUserByUsername(req.params.username);

        if (!user) {
            return res.status(404).json(null);
        }

        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);

        if (!user) {
            return res.status(404).json(null);
        }

        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getUsers,
    createUser,
    getUserByUsername,
    getUserById,
};
