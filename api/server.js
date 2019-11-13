const config = require("./middleware/config-mw");

const authRouter = require("./auth/auth-router");

const server = express();

config(server);

server.use("/api/auth", authRouter);

module.exports = server;
