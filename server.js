"use strict";

const http = require('http');
const express = require('express');

const server = express();

server.get(encodeURI('/словарь'), (req, res)=> {
    res.status(301).redirect('https://lifehacker.ru/ispanskij-styd/');
});

http.createServer(server).listen(3000, () => {
    console.log(`Server start`);
});