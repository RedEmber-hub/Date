const API_URL = "http://localhost:3000";

async function getUserByUsername(username) {
    const response = await fetch(
        `${API_URL}/users/username/${username}`
    );

    if (response.status === 404) {
        return null;
    }

    if (!response.ok) {
        throw new Error("Ошибка поиска пользователя");
    }

    return await response.json();
}

module.exports = {
    getUserByUsername,
};