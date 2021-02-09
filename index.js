MongoClient = require("mongodb").MongoClient;
express = require("express");

url = process.env.PORT || "mongodb://localhost:27017"

MongoClient.connect(url, function (err, client) {
  if (err)
    throw new Error(err);
  
  console.log(client)
})