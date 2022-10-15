const port = process.env.port || 3000;
const path = require('path');
const http = require('http');
const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
const url = require('url');
const bcrypt = require('bcrypt');
const { mainModule } = require('process');

require('dotenv').config();

const uri = process.env.PRIVATE_KEY;
const client = new MongoClient(uri);

app.use(express.static(__dirname));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/registrazione.html');
});
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});
app.get('/sidebar2', (req, res) => {
    res.sendFile(__dirname + '/sidebar2.html');
});

var db;
client.connect(function(err, database) {
    db = database;
 });
var collection = client.db("Users").collection("LoginInfo");

app.post('/',async (req,res) => {
    const { name, email, password, confermaPassword, boolArtista, boolAscoltatore } = req.body;

    async function main() {
        try {
            const useremail = await collection.findOne({email : email});
            const username = await collection.findOne({name : name});
            if(useremail != null || username != null) {
                if(username === null) 
                    console.log("Questa mail è gia registrata sul nostro sito");
                if(useremail === null)
                    console.log("Questo nome utente è gia registrato sul nostro sito");
            }
            else {
                if(password === confermaPassword && checkPassword(password) && (name.length >= 2 && name.length <= 20) && (boolArtista != 'off' || boolAscoltatore != 'off')) {
                    const hashedPassword = await bcrypt.hash(password, 10);
                    await createListing(client,  {
                        name: name,
                        email: email,
                        password: hashedPassword,
                        switch_artista: boolArtista,
                        switch_ascoltatore: boolAscoltatore
                    })
                    res.redirect('/');
                } else {
                    console.log('Inserire un nome utente e una password decenti');
                }
            }
        } catch (e) {
            console.error(e);
        }
    }
    main().catch(console.error);
});

app.post('/login', async (req,res) => {
    const { email, password } = req.body;
    try {
        const useremail = await collection.findOne({email : email});
        if(useremail != null) {
            const validPassword = await bcrypt.compare(password, useremail.password);
            if(validPassword) {
                res.redirect('/login');
            } else {
                res = 404;
                console.log("errata " + res);
            }
        }
    } catch (e) {
        console.error(e);
    }
});

function checkPassword(str) {
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(str);
}

async function createListing(client, newListing) {
    const result = await client.db("Users").collection("LoginInfo").insertOne(newListing);

    console.log(`New Listing created with the following id: ${result.insertedId}`)
}

app.listen(port,() => {
    console.log(`Server started at http://localhost:${port}`);
}); 