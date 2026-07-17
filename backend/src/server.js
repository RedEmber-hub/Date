const express = require("express");

const app = express();

const inviteRoutes = require("./routes/inviteRoutes");

const PORT = 3000;

app.use(express.json());

app.use("/invites", inviteRoutes);

app.get("/", (req, res) => {
    res.send("Server is running");
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});