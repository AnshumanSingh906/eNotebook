const connectToMongo = require ('./db');
var cors = require('cors')


const express = require ('express');
connectToMongo();

const app = express();
app.use(express.json());

app.use(cors())

const auth = require('./routes/auth');
const notes= require('./routes/notes');
app.use('/api/auth',auth);
app.use('/api/notes',notes);

app.listen(3002,()=>{
    console.log("Server started at http://localhost:3002");
});