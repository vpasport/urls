"use strict";

require('dotenv').config();

const http = require('http');
const express = require('express');
const session = require('express-session');
const pgStoreConnect = require('connect-pg-simple')(session);

const cors = require('cors');
const bodyParser = require('body-parser');

const server = express();
const initRouters = require('./src/routers/index');

const pool = require('./src/database/pg/pool').getPool();

server.use(
    cors({
        origin: true,
        credentials: true
    })
)

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

const dev = process.env.NODE_ENV !== 'production';

server.use(
    session({
        cookie: {
            httpOnly: true,
            maxAge: !dev ? parseInt(process.env.SESSION_COOKIE_MAXAGE) : null,
            secure: !dev && process.env.SESSION_COOKIE_SECURE === "true"
        },
        name: !dev ? process.env.SESSION_NAME : null,
        resave: false,
        rolling: true,
        saveUninitialized: false,
        secret: !dev ? process.env.SESSION_SECRET : "secret",
        store: new pgStoreConnect({
            pool: pool,
            tableName: process.env.SESSION_TABLE_NAME
        })
    })
);

initRouters(server);

http.createServer(server).listen(process.env.PORT, () => {
    console.log(`Server start on ${process.env.PORT} port`);
});