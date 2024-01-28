const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express')
const cors = require('cors')
const app = express()
const port = 5000

app.use(express.json())
app.use(cors())

require('dotenv').config()



const uri = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster0.hcgdznz.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    
    const blogCollection = client.db("blogdoodleinc-database").collection("blogs")

    app.post("/blogpost", async (req, res) => {
        const blog = req.body
        const blogpostFromDatabase = await blogCollection.insertOne(blog)
        res.send(blogpostFromDatabase)
    })
    
    app.get("/blogs", async (req, res) => {
        const query = {}
        const allblogs = await blogCollection.find(query).toArray()
        res.send(allblogs)
    })

    app.get("/blog/:id", async (req, res) => {
        const id = parseInt(req.params.id)
        console.log(id)
        const query = {id: id}
        const singleblog = await blogCollection.findOne(query)
        res.send(singleblog)
    })







    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    
  }
}
run().catch(console.dir);








app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Doodleinc app listening on port ${port}`)
})

