const invitationService = require("../services/invitationService");

async function getInvitations(req, res) {
    try {
        const invitations = await invitationService.getInvitations();
        res.json(invitations);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Ошибка получения приглашений",
        });
    }
}

async function createInvitation(req, res) {
    try {
        const invitation = await invitationService.createInvitation(req.body);
        res.status(201).json(invitation);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Ошибка создания приглашения",
        });
    }
}

async function getInvitationByToken(req, res) {
    try {
        const invitation =
            await invitationService.getInvitationByToken(
                req.params.token
            );

        if (!invitation) {
            return res.status(404).json({
                message: "Приглашение не найдено",
            });
        }

        res.json(invitation);
    } catch (err) {
        res.status(500).json({
            message: "Ошибка получения приглашения",
        });
    }
}

async function getWaitingInvitations(req, res) {
    try {
        const invitations =
            await invitationService.getWaitingInvitations(
                req.params.username
            );

        res.json(invitations);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Ошибка получения приглашений",
        });
    }
}

async function activateWaitingInvitations(req, res) {
    try {
        const invitations =
            await invitationService.activateWaitingInvitations(
                req.params.username
            );

        res.json(invitations);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Ошибка активации приглашений",
        });
    }
}

async function updateInvitation(req, res) {
    try {
        const invitation =
            await invitationService.updateInvitationByToken(
                req.params.token,
                req.body
            );

        if (!invitation) {
            return res.status(404).json({
                message: "Приглашение не найдено",
            });
        }

        res.json(invitation);
    } catch (err) {
        res.status(500).json({
            message: "Ошибка обновления приглашения",
        });
    }
}

module.exports = {
    getInvitations,
    createInvitation,
    getInvitationByToken,
    updateInvitation,
    getWaitingInvitations,
    activateWaitingInvitations,
};