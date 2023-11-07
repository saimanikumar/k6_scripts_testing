console.log(__dirname)
const express = require('express')
// const app = express()

// // const s = require("../api's_node/s.html")
// app.get('/', (req, res) => {
// //   res.send(s)
// })

// app.listen(3000)


// var express = require('express');
var app = express()

app.set("view options", {layout: false});
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname+"/public/s.html");
});

app.listen(3000)