const express = require("express");
const router = express.Router();

const invitationController = require("../controllers/invitationController");

router.get("/", invitationController.getInvitations);
router.get(
    "/waiting/:username",
    invitationController.getWaitingInvitations
);
router.put(
    "/waiting/:username",
    invitationController.activateWaitingInvitations
);
router.get("/:token", invitationController.getInvitationByToken);
router.post("/", invitationController.createInvitation);
router.put("/:token", invitationController.updateInvitation);

module.exports = router;