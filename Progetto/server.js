const path = require('path');
const express = require('express');
const app = express();

app.use(express.static(__dirname));

app.get('/', function(req,res) {
    res.sendFile(path.join(__dirname + '/login.html'));
})
app.get('/registrazione.html', function(req,res) {
    res.sendFile(path.join(__dirname + '/registrazione.html'));
})
app.get('/login.html', function(req,res) {
    res.sendFile(path.join(__dirname + '/login.html'));
})

app.listen(3000);