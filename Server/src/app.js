const express = require("express");
require("dotenv").config();
const server = express();
const morgan = require("morgan");
const cloudinary = require('cloudinary').v2;
const cors = require('cors');
const bodyParser = require('body-parser')

const {PORT, CLOUD_NAME, KEY_CLOUD, SECRET_CLOUD} = process.env;

const routes = require("./routes/index");

//Config de Cloudinary
cloudinary.config({ 
	cloud_name: CLOUD_NAME, 
	api_key: KEY_CLOUD, 
	api_secret: SECRET_CLOUD 
});

server.use(bodyParser.json());
server.use(cors());


server.use((req, res, next) => {
  const allowedOrigins = [
    `http://localhost:${PORT}`,
  ];

  const origin = req.headers.origin;
  if(allowedOrigins.includes(origin)){
    res.header('Access-Control-Allow-Origin', origin); // update to match the domain you will make the request from
  }
	res.header("Access-Control-Allow-Credentials", "true")
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
	next();
});

// Middlewares
server.use(express.json());
server.use(morgan("dev"));
server.use("/", routes); //to every route start with /


module.exports = server;