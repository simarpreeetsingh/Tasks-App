// const MongoClient = require("mongodb").MongoClient

// const url = process.env.PORT || "mongodb://127.0.0.1:27017"
// const dbName = "Tasks"

// MongoClient.connect(url, function(err, client) {
//   if (err)
//     throw new Error(err)
  
//   collection = client.db(dbName).collection("Practise")
//   collection.insert({
//     name: "Coder Singh"
//   })
// })

const mongoose = require("mongoose");
const app = require(__dirname + "/router");

const dbName = "task-app";
const url = process.env.PORT || `mongodb://127.0.0.1:27017/${dbName}`;

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
.then(doc => {
  console.log("doc");
})

port = process.env.PORT || "6996"

app.listen(port, (doc) => console.log(`Listening to port ${port}`))