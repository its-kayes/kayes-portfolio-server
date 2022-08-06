const { MongoClient, ServerApiVersion, ObjectId, Transaction } = require('mongodb');
const express = require('express');
const cors = require('cors');
// let jwt = require('jsonwebtoken');
require('dotenv').config();
const port = process.env.PORT || 5000;
let app = express();

app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wc9rj.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        let projectsCollection = client.db("portfolio").collection("projects");


        app.get('/projects', async (req, res) => {
            let result = await projectsCollection.find().toArray();
            res.send(result);
        });

    }

    finally{

    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Portfolio on fire ');
});

app.listen(port, () => {
    console.log('Portfolio On Fire', port);
})