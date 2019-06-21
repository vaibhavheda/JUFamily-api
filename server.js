const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
// const pg = require('pg');


const db = knex({
    client: 'pg',
    connection: {
        connectionstring: process.env.DATABASE_URL,
        ssl: true
    }
});
//this is to create server
let app = express();
//middleware
app.use(cors());
app.use(bodyParser.json({}));
const database = {
    users: [
        {
            id: 1,
            name: "vaibhav",
            email: "vaibhav.heda799@gmail.com",
            linkedin: "",
            image: ""
        },
        {
            id: 2,
            name: "vaib",
            email: "vaibhav799@gmail.com",
            linkedin: "",
            image: ""
        },
        {
            id: 3,
            name: "v",
            email: "vaibhav.heda@gmail.com",
            linkedin: "",
            image: ""
        }
    ]
}

app.all('*', (req, res, next) => {
    var origin = req.get('origin');
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})
//root
app.get('/', (req, res) => {
    res.send("this is working");
});

app.get('/add-family', (req, res) => {
    res.send("okey");
    console.log(database.users[1]);
})

//add-family

app.post('/add-family', (req, res) => {
    const { name, email, jobtitle, linkedin, image } = req.body;
    console.log(name, email, jobtitle);
    db('member').returning('*').insert({
        name: name,
        email: email,
        jobtitle: jobtitle,
        linkedin: linkedin,
        image: image
    }).then(res.json("Successful"));

});

app.get('/family', (req, res) => {
    db.select('*').from('member')
        .then(member => {
            res.json(member);
        })
})






const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`app is running on ${PORT}`);
})

/*
/ --> this is working resp
/family --> GET
/add-family --> POST
*/
