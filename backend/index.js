var express = require('express')
var cors = require('cors')
var app = express()
// const Notes = require("./models/Notes")


app.use(cors())
const port = 8000;
require("./conn/db");

app.use(express.json()); // Add this line to parse JSON request bodies
app.use('', require("./routers/auth"))
app.use('/api/notes', require("./routers/notes"))



app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
