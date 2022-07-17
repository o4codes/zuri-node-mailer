const express = require('express');
const morgan = require('morgan');
const mailing = require('./services/mailing');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(morgan('dev'));


app.get('/', (req, res) => {
    res.send({
        status: 'success',
        message: 'Welcome to the mailing service'
    })
});


app.post('/mails', (req, res) => {
    try{
        let { subject, body, to } = req.body;
        body = `<p>${body}</p>`;

        mailing.send_email(subject, body, to);
        res.status(200).send({
            status: 'success',
            message: 'Email sent'
        })
    }
    catch(err){
        console.log(err);
        res.status(500).send({
            status: 'error',
            message: err.message
        })
    }
    
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
    }
);