// Express
const express = require('express');
const app = express();

// Body-Parser
app.use(express.urlencoded({extended: true}));

// EJS
app.engine('.ejs', require('ejs').__express);
app.set('view engine', 'ejs');

// Cookie-Parser
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Express-Session
const session = require('express-session');
const { render } = require('ejs');
app.use(session({
secret: 'YOURSECRETCODE',
saveUninitialized: false,
resave: false
}));

//Ordner freigeben
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));

//mongoose
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://Admin-AK:AfshinAdminKorrani0811@travelbuddy.qkbzqq0.mongodb.net/TravelBuddy", {useNewUrlParser: true});

//Feedback Data
const feedbackDataSchema = {
    feedbackName: String,
    feedbackMail: String,
    feedbackText: String,
};

const FeedbackSubmission = mongoose.model("feedbackSubmission", feedbackDataSchema);

//CitySuggestion Data
const citySuggestionSchema = {
    cityName: String,
    countryName: String,
};

const CitySuggestion = mongoose.model("citySuggestion", citySuggestionSchema);

//Paris Data
// const parisDataSchema = {
//     Group: String,
//     Name: String,
//     Link: String,
// };

// const ParisData = mongoose.model("parisData", parisDataSchema);


// FeedbackSubmission.find({}, function(err, foundItems){
//     console.log(foundItems);
// })

// const item1 = new Item({
//     name: "Welcome to Paris!"
// });

// const itemsSchema = {
//     name: String
// };

// const Item = mongoose.model("Item", itemsSchema);


// Item.insertMany(item1, function(err){
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Successfully saved default items to DB");
//     }
// });


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
    const cityNameParis = "Paris";
    res.render(__dirname + "/views/paris.ejs", { KonstcityName: cityNameParis});
});

app.get('/berlin', function(req, res){
    const cityNameBerlin = "Berlin";
    res.render(__dirname + "/views/berlin.ejs", { KonstcityName: cityNameBerlin});
});

app.get('/madrid', function(req, res){
    const cityNameMadrid = "Madrid";
    res.render(__dirname + "/views/madrid.ejs", { KonstcityName: cityNameMadrid});
});

app.get('/wien', function(req, res){
    const cityNameWien = "Wien";
    res.render(__dirname + "/views/wien.ejs", { KonstcityName: cityNameWien});
});


// Feedback
app.post("/feedback", function(req, res){

    const feedbackData = new FeedbackSubmission({
        feedbackName: req.body.name,
        feedbackMail: req.body.email,
        feedbackText: req.body.feedback,
    });

    FeedbackSubmission.insertMany(feedbackData, function(err){
        if (err) {
            console.log(err);
        } else {
            console.log("Successfully saved data to DB");
        }
    });

    res.render("feedback_submitted");
});

//City-Suggestion
app.post("/city_suggestion", function(req, res){

    const citySuggetionsData = new CitySuggestion({
        cityName: req.body.city,
        countryName: req.body.country,
    });

    CitySuggestion.insertMany(citySuggetionsData, function(err){
        if (err) {
            console.log(err);
        } else {
            console.log("Successfully saved data to DB");
        }
    });

    res.render("feedback_submitted");
});