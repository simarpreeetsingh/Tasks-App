const app = require("express")()

port = process.env.PORT || 6996

app.listen(port)

app.get("/", function (res, req) {
  console.log(res.params)
  console.log(res.query)
})

app.post("/", function (res, req) {
  console.log(res.params)
  console.log(res.query)
})