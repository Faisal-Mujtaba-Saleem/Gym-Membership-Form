const express = require('express');
const path = require('path');
const fs = require('fs');
const pug = require('pug');

const app = express();

const host = '127.0.0.1';
const port = 80;

// EXPRESS SPECIFIC STUFF 
app.use(express.urlencoded())
app.use('/static', express.static('./static'));

// PUG SPECIFIC STUFF
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// END POINTS 
app.get('/', (req, res) => {
    res.render('view');
});

app.post('/', (req, res) => {
    const { name, email, number, age, gender, address } = req.body;
    fs.writeFile(
        `${name}`,
        `The name of the user is ${name}, ${age} years old, ${gender}, he/she residise at ${address}.`,
        (err) => {
            if (!err) {
                fs.writeFile(`${name}.json`, JSON.stringify(req.body), (err) => {
                    if (err) {
                        res.send("Form submission failed")
                    } else {
                        res.render('view')
                    }
                });
            } else {
                res.send("Form submission failed")
            }
        }
    );
})

// SETTING THE PORT & HOST 
app.listen(port, host, () => {
    console.log(`Express app listening on port with http://localhost:${port}`);
})