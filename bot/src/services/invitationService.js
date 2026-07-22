const crypto = require("crypto");
const { getUserByUsername } = require("./api");

const API_URL = "http://localhost:3000";

async function createInvitation(userId, username) {

    const user = await getUserByUsername(username);

    const status = user
        ? "pending"
        : "waiting_user";

    const response = await fetch(
        `${API_URL}/invitations`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: userId,
                girl_username: username,
                status,
            }),
        }
    );

    if (!response.ok) {
        throw new Error("Ошибка создания приглашения");
    }

    const invitation = await response.json();

    return {
        invitation,
        user,
    };
}

module.exports = {
    createInvitation,
};