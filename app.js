require('dotenv').config();
const Server = require('./models/server');


const publicFolder = __dirname + '/public/';
process.public_folder = publicFolder;

const server = new Server();

server.listen();