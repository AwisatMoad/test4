const express = require('express');
const bodyParser = require('body-parser');
var bcrypt = require('bcryptjs');
var cors = require('cors');
const knex =require('knex');

const register = require('./controllers/register');
const signin =  require('./controllers/signin');
const profile =  require('./controllers/profile');
const image =  require('./controllers/image');


const db = knex ({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'test',
      database : 'smartbrain'
    }
});



const app = express();

app.use(bodyParser.json());
app.use(cors())

app.get('/', (req,res) => {res.send(dataBase.Users);})
app.post('/signin', (req,res) => {signin.handleSignin(req,res,db,bcrypt)})
app.post('/register', (req,res) => { register.handleRegister(req,res,db,bcrypt)})
app.put('/profile/:id', (req,res) => {profile.handleProfileGet(req.res.db.bcrypt)})
app.put('/image', (req,res) => {image.handleImage(req,res,db)})
app.post('/imageurl', (req,res) => {image.handleApiCall(req,res)})

//const PORT = process.env.PORT;
console.log("ok");

app.listen(  3030, () =>{
    console.log(`app is tunning on port 3030`);
});
