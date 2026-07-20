const express = require("express");
const app = express();

const userRoutes = require("./routes/userRoutes");
const invitationRoutes = require("./routes/invitationRoutes");

const PORT = 3000;

app.use(express.json());

app.use("/users", userRoutes);
app.use("/invitations", invitationRoutes);

app.get("/", (req, res) => {
    res.send("Server is running");
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});