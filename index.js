const express = require('express')
require('dotenv').config()
var cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.user}:${process.env.password}@cluster0.m6qrp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();
        console.log('database c')
        const collection = client.db("doctors_portal").collection("services");
        
        app.get('/services',async(req, res)=> {
            const query = {};
            const cursor = collection.find(query);
            const services= await cursor.toArray();
            res.send(services);
        })

    } finally {
        
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Doctors portal server')
})

app.listen(port, () => {
  console.log(`Doctors portal server on port ${port}`)
})