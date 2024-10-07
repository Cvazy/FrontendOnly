const jsonServer = require("json-server");
const cors = require("cors");
const path = require("path");

const server = jsonServer.create();
server.use(jsonServer.bodyParser);

const router = jsonServer.router(path.resolve(__dirname, "db.json"));

server.use(cors());

server.use(jsonServer.defaults());

server.use(router);

server.listen(8080, () => {
  console.log("server is running on 8080 port");
});
