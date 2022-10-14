const { application } = require('express');
const { MongoClient } = require('mongodb');
const express = require('express');

require('dotenv').config();
console.log(process.env.PRIVATE_KEY);

async function main() {
    const uri = process.env.PRIVATE_KEY;
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();
        
        
        await createListing(client,  {
            name: "John",
            summary: "testing",
            bedrooms: 1,
            bathrooms: 1
        })

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

async function createListing(client, newListing) {
    const result = await client.db("database").collection("collection").insertOne(newListing);

    console.log(`New Listing created with the following id: ${result.insertedId}`)
}


async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};