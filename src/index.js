var http = require('http');
var url = require('url');
var bodyParser = require('body-parser');
var xss = require('xss');
var express = require('express');

var app = express();

//user bodyparser as middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* Whitelist */
var options = {
    whitelist: {
        a: [ "href"],
        img: ["src", "height", "width", "alt", "title"],
        span: ["style"],
        b: [],
        h3: [],
        h4: [],
        h5: [],
        h6: [],
        i: [],
        em: [],
        strong: [],
        p: [],
        hr: [],
        br: [],
        ul: [],
        ol: [],
        li: []
    }
}


//Validate -ret boolean
function validate(chunk) {
    var val = xss(chunk, options);
    return (chunk == val);

};

//Sanitize - ret string
function sanitize(chunk) {
    var val = xss(chunk, options);
    return val;

};

app.post('/validate', function (req, res) {
    var value = req.body.val;

    if (validate(value)) {
        res.status(200).send('{"value":' + 'true}');
    }
    else {
        res.status(400).send('{"value":' + 'false}');
    }
});

app.post('/sanitize', function (req, res) {
    var value = req.body.val;
    res.status(200).send('{"value":"' + sanitize(value) + '"}');
});

//listening server
var server = app.listen(8080, function () {
    console.log('Server started: listening on port 8080');
});

