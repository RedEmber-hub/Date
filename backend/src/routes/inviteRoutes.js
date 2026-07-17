const express = require("express");

const router = express.Router();

const { invites, responses } = require("../data/storage");
const generateToken = require("../utils/generateToken");

router.post("/", (req, res) => {
    const { username } = req.body;

    const token = generateToken();

    const invite = {
        id: invites.length + 1,
        username,
        token,
        status: "created",
    };

    invites.push(invite);

    res.json({
        message: "Invite created",
        link: `/invites/${token}`,
    });
});

router.get("/:token", (req, res) => {
    const { token } = req.params;

    const invite = invites.find(
        (invite) => invite.token === token
    );

    if (!invite) {
        return res.status(404).json({
            message: "Invite not found",
        });
    }

    res.json(invite);
});

router.post("/:token/response", (req, res) => {
    const { token } = req.params;

    const invite = invites.find(
        (invite) => invite.token === token
    );

    if (!invite) {
        return res.status(404).json({
            message: "Invite not found",
        });
    }

    const {
        date,
        time,
        food,
        meetingPlace,
        comment,
    } = req.body;

    const response = {
        id: responses.length + 1,
        inviteId: invite.id,
        date,
        time,
        food,
        meetingPlace,
        comment,
    };

    responses.push(response);

    invite.status = "answered";

    res.status(201).json({
        message: "Response saved successfully",
        response,
    });
});

module.exports = router;