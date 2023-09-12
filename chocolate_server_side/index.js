const express = require('express');
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000;
require('dotenv').config()
const jwt = require('jsonwebtoken')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('server is running')
})

console.log()

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.scg3zw6.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const verifyJWT = (req, res, next) => {
  // console.log(req.headers.authorization)
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).send({ error: true, message: 'unauthorized' })
  }
  const token = authorization.split(' ')[1]
  console.log('36line ', token)

  jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(401).send({ error: true, message: 'unauthorized' })
    }
    req.decoded = decoded;
    next()
  })
}

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const database = client.db('chocolateDB')
    const chocolateCollection = database.collection('chocolateCollection')


    //jwt API..........
    app.post('/jwt', (req, res) => {
      const user = req.body
      // console.log(user)
      const token = jwt.sign(user, process.env.ACCESS_SECRET_TOKEN, { expiresIn: '1hr' })
      // console.log(token)
      res.send({ token })
    })


    app.get('/items', async (req, res) => {
      const cursor = chocolateCollection.find()
      const result = await cursor.toArray()
      // console.log(result)
      res.send(result)
    })

    app.get('/items/:id', async (req, res) => {
      const id = req.params.id
      // console.log(id)
      const query = { _id: new ObjectId(id) }
      const result = await chocolateCollection.findOne(query)
      // console.log(result)
      res.send(result)
    })


    app.post('/items', async (req, res) => {
      const newItem = req.body;
      // console.log(newItem)
      const result = await chocolateCollection.insertOne(newItem)
      res.send(result)
    })


    app.put('/items/:id', async (req, res) => {
      const id = req.params.id
      const options = { upsert: true }
      const filter = { _id: new ObjectId(id) }
      const itemInfo = req.body
      const updatedItemInfo = {
        $set: {
          photo: itemInfo.photo,
          name: itemInfo.name,
          category: itemInfo.category,
          price: itemInfo.price,
          date: itemInfo.date,
          check: itemInfo.check
        }
      }
      const result = await chocolateCollection.updateOne(filter, updatedItemInfo, options)
      res.send(result)
    })

    app.delete('/items/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) }
      const result = chocolateCollection.deleteOne(query)
      res.send(result)
    })

    //search some data
    app.get('/item', verifyJWT, async (req, res) => {
      const decoded = req.decoded
      if (!decoded.email) {
        res.status(403).send('forbidden access!!')
      }
      console.log('line 119', decoded)
      let query = {}
      if (req.query.search) {
        query = { category: req.query.search }
      }
      const result = await chocolateCollection.find(query).toArray()
      res.send(result)
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.listen(port, () => {
  console.log('server is running on port', +port)
})