"use strict";

const http = require('http');
const express = require('express');

const server = express();

server.get(encodeURI('/словарь'), (req, res)=> {
    res.status(301).redirect('https://lifehacker.ru/ispanskij-styd/');
});


const PORT = process.env.PORT || 5000;
http.createServer(server).listen(PORT, () => {
    console.log(`Server start`);
});