const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const pg = require('pg');


const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true
    }
});
//this is to create server
let app = express();
//middleware
app.use(cors());
// app.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', '*');
//     res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
//     res.header('Access-Control-Expose-Headers', '*');

//     if (req.method === 'OPTIONS') {
//         res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
//         return res.status(200).json({});
//     }
//     next();
// });

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


//root
app.options('*', cors());
app.get('/', cors(), (req, res) => {
    res.send("this is working");
})

app.get('/addfamily', cors(), (req, res) => {
    res.send("okey");
})

//add-family

app.post('/addfamily', cors(), (req, res) => {
    const { name, email, jobtitle, linkedin, image } = req.body;
    console.log(req.body);
    db('member').insert({
        name: name,
        email: email,
        jobtitle: jobtitle,
        linkedin: linkedin,
        image: image
    }).then(res.json("Successful"));

})

app.get('/family', cors(), (req, res) => {

    db.select('*').from('member')
        .then(member => {
            res.json(member);
        }
        );

})

app.options('/addfamily', cors(), (req, res) => {
    const { name, email, jobtitle, linkedin, image } = req.body;
    console.log(req.body);
    db('member').insert({
        name: name,
        email: email,
        jobtitle: jobtitle,
        linkedin: linkedin,
        image: image
    }).then(res.json("Successful"));

})




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`app is running on ${PORT}`);
});

/*
/ --> this is working resp
/family --> GET
/add-family --> POST
*/
