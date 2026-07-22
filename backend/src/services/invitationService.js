const pool = require("../db/db");

const crypto = require("crypto");

async function getInvitations() {
    const result = await pool.query(
        "SELECT * FROM invitations ORDER BY created_at DESC"
    );

    return result.rows;
}

async function getInvitationByToken(token) {
    const result = await pool.query(
        `SELECT * FROM invitations
         WHERE token = $1`,
        [token]
    );

    return result.rows[0];
}

async function getWaitingInvitations(username) {
    const result = await pool.query(
        `SELECT *
         FROM invitations
         WHERE girl_username = $1
           AND status = 'waiting_user'
         ORDER BY created_at`,
        [username]
    );

    return result.rows;
}

async function activateWaitingInvitations(username) {
    const result = await pool.query(
        `UPDATE invitations
         SET status = 'pending'
         WHERE girl_username = $1
           AND status = 'waiting_user'
         RETURNING *`,
        [username]
    );

    return result.rows;
}

async function updateInvitationByToken(token, invitation) {
    const {
        meeting_date,
        meeting_place,
        food,
        comment,
    } = invitation;

    const result = await pool.query(
        `UPDATE invitations
         SET meeting_date = $1,
             meeting_place = $2,
             food = $3,
             comment = $4,
             status = 'completed'
         WHERE token = $5
         RETURNING *`,
        [
            meeting_date,
            meeting_place,
            food,
            comment,
            token,
        ]
    );

    return result.rows[0];
}

async function createInvitation(invitation) {
    const {
         user_id,
    girl_username,
    status,
    } = invitation;

    const token = crypto.randomUUID();

    const result = await pool.query(
        `INSERT INTO invitations
        (user_id, girl_username, token, status)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
        [
            user_id,
            girl_username,
            token,
            status,
        ]
    );

    return result.rows[0];
}

module.exports = {
    getInvitations,
    createInvitation,
    getInvitationByToken,
    updateInvitationByToken,
    getWaitingInvitations,
    activateWaitingInvitations,
};