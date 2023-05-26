const express=require("express")
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors=require("cors")
const app=express()


app.use(express.json())
app.use(cors())

const uri = `mongodb+srv://vercel_demo:bw9BrkIBmh6LQln3@cluster0.koa7uom.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  const doc={
    name:"Police",
    location:"Dhaka"
  }

  app.get("/insert",async(req,res)=>{
        try{
            const collection= await client.connect()
            const collectionDb=await collection.db("school").collection("students")
            const inserted = await collectionDb.insertOne(doc)
            console.log(inserted);
            res.send(inserted)
        }catch(err){
            console.log(err)
        }
  })

  app.get("/binsert",async(req,res)=>{
        try{
            const collection= await client.connect()
            const collectionDb=await collection.db("school").collection("police")
            const inserted = await collectionDb.insertOne(doc)
            console.log(inserted);
            res.send(inserted)
        }catch(err){
            console.log(err)
        }
  })

  app.get('/hadi',()=>{
    async function run() {
        try {
          const database = client.db("insertDB");
          const haiku = database.collection("haiku");
          // create a document to insert
          const doc = {
            title: "Record of a Shriveled Datum",
            content: "No bytes, no problem. Just insert a document, in MongoDB",
          }
          const result = await haiku.insertOne(doc);
          console.log(`A document was inserted with the _id: ${result.insertedId}`);
        } finally {
          await client.close();
        }
      }
      run().catch(console.dir);
  })


app.get('/',(req,res)=>{
    res.send("Hello World.")
})

const port = process.env.PORT || 3030

app.listen(port,()=>{
    console.log("Server is listening on port "+port);
})