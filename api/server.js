const config = require('./middleware/config-mw');

const server = express();

config(server);

module.exports = server;