const config = require("./middleware/config-mw");

const authRouter = require("./auth/auth-router");
const userRouter = require("./routes/user-router");

const server = express();

config(server);

server.use("/api/auth", authRouter);
server.use("/api/users", userRouter);

module.exports = server;
