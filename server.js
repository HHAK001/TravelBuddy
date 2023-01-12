// Express
const express = require('express');
const app = express();

// Body-Parser
app.use(express.urlencoded({extended: true}));

// EJS
app.engine('.ejs', require('ejs').__express);
app.set('view engine', 'ejs');

// SQLite3
const sqlite3 = require('sqlite3').verbose();
const DATABASE = 'public/database/Benutzer.db';
const feedbackDB = 'public/database/Feedback.db'
const db = new sqlite3.Database(DATABASE);
const db2 = new sqlite3.Database(feedbackDB);

// Cookie-Parser
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Express-Session
const session = require('express-session');
app.use(session({
secret: 'YOURSECRETCODE',
saveUninitialized: false,
resave: false
}));

//Ordner freigeben
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));

//Server-starten
app.listen(5050, function()
{
console.log('started on port 5050');
});

//GET-Request
app.get(['/', '/startseite','/home','/homepage'], function(req, res){
    res.render(__dirname + "/views/home.ejs");
});

app.get('/contact', function(req, res){
    res.render(__dirname + "/views/contact.ejs");
});

app.get('/suggestion', function(req, res){
    res.render(__dirname + "/views/suggestion.ejs");
});

app.get('/paris', function(req, res){
    res.render(__dirname + "/views/paris.ejs");
});




// Feedback
app.post("/feedback", function(req, res){
    const param_name = req.body.name;
    const param_email = req.body.email;
    const param_feedback = req.body.feedback;

    db2.run(
        `INSERT INTO feedback(name, email, feedback) VALUES ("${param_name}", "${param_email}", "${param_feedback}")`,
        function(err){
            return res.render("feedback_submitted");
        }
    )

});