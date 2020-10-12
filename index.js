const bodyParser = require('body-parser');
const express = require('express')
const { v4: uuidv4 } = require('uuid');
const app = express()
const port = process.env.PORT || 3000

//query param == polku/i?-----

/*
/items GET POST
/items/{itemID} GET PUT DELETE
/items/search GET query params -- PUUTTUU

/login POST
/Users POST
/users/{userID} GET
*/

app.use(bodyParser.json());

let items = [
    {
        id: uuidv4(),
        description: 'Buy some cheese',
        dueDate: '2020-16-09',
        isDone: true
    }
]

let users = [
    {
        id: uuidv4(),
        username: "Keppo",
        name: "Urho Kekkonen",
        phone: "040 1234567",
        email: "kekkonen@gmail.com",
        birthdate: '2020-16-09',
        password: 'password1',
        street: "urhonkuja 2",
        county: "Lappi",
        postalcode: 95500,
        city: "Tornio"
    },
    {
        id: uuidv4(),
        username: "Keppo",
        name: "Urho Kekkonen",
        phone: "040 1234567",
        email: "kekkonen@gmail.com",
        birthdate: '2020-16-09',
        password: 'password1',
        street: "urhonkuja 2",
        county: "Lappi",
        postalcode: 95500,
        city: "Tornio"
    },
    {
        id: uuidv4(),
        username: "Kuppa",
        name: "Urho Kekkonen",
        phone: "040 1234567",
        email: "kekkonen@gmail.com",
        birthdate: '2020-16-09',
        password: 'password2',
        street: "urhonkuja 2",
        county: "Lappi",
        postalcode: 95500,
        city: "Tornio"
    }
]


app.get('/', (req, res) => {
    res.send('Hello World')
})

app.get('/items/', (req, res) => {
    res.json(items);
})

app.post('/items/', (req, res) => {

    const newItem = {
        id: uuidv4(),
        description: req.body.description,
        dueDate: req.body.dueDate,
        isDone: req.body.isDone
    }
    items.push(newItem);

    console.log(req.body);
    res.sendStatus(200);

    // JOS PAKOLLISIA TIETOJA PUUTTUU res.sendStatus(400); ---------------------------------------

})

app.get('/items/:id', (req, res) => {

    const result = items.find(t => t.id == req.params.id);

    if(result !== undefined)
    {
        res.json(result);
    }
    else
    {
        res.sendStatus(404);
    }
})

app.put('/items/:id', (req, res) => {
    const result = items.find(t => t.id == req.params.id);
    
    if(result !== undefined)
    {
        for (const key in req.body) {
            result[key] = req.body[key];
        }
        res.sendStatus(200);
    }
    else
    {
        res.sendStatus(404);
        // res.sendStatus(401); UNAUTHORIZED ----------------------------------------------------------
    }
})

app.delete('/items/:id', (req, res) => {
    const result = items.findIndex(t => t.id == req.params.id);
    if(result !== -1){
        items.splice(result, 1);
        res.sendStatus(200);
    }
    else{
        res.sendStatus(404);
        //res.sendStatus(401);  UNAUTHORIZED
    }

})


app.get('/users/search?', (req, res) => { //------------------ EI toii

    const result = users.find(t => t.username === req.query.username);
    //const result = users.findIndex(t => t.username === req.query.username);
    
    if(result !== undefined)
    {
        for (const key in req.query) {
            res.json({result})
          }
          
        
        //res.json(users);
        //for (const key in req.body) {
        //    res.sendStatus(200)
            //res.json(req.body)
            //res.send('Hello World')  
        //}

        /*
         const id = Number(request.params.id)
        const note = notes.find(note => note.id === id)
        */
    }
    else
    {
        res.sendStatus(404);
    }
})

/*
Example:

GET /something?color1=red&color2=blue

Then in express, the handler:

app.get('/something', (req, res) => {
    req.query.color1 === 'red'  // true
    req.query.color2 === 'blue' // true
})
*/

app.post('/users/', (req, res) => {

    const newUser = {
        id: uuidv4(),
        username: req.body.username,
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        birthdate: req.body.birthdate,
        street: req.body.street,
        county: req.body.county,
        postalcode: req.body.postalcode,
        city: req.body.city
    }
    users.push(newUser);

    console.log(req.body);
    res.sendStatus(200);

})

app.get('/users/', (req, res) => {
    res.json(users);
})

app.get('/users/:id', (req, res) => {

    const result = items.find(t => t.id == req.params.id);

    if(result !== undefined)
    {
        res.json(result);
    }
    else
    {
        res.sendStatus(404);
    }
})








/*

//login?username=Keppo&password=password1
app.post('/login?', (req, res) => {
    const username = req.query.username;
    const password = req.query.password;

    if (username == null || password == null) {
        res.sendStatus(400);
    }
    else {
        app.send("aaaaa" + username)
    }

*/








app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
