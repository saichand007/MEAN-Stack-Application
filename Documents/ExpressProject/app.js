require("./api/data/db.js");
var express=require('express');
var path=require('path');
var app=express();
var routes=require("./api/routes");
var bodyparser=require("body-parser");
var jwt = require('jsonwebtoken');

var passport = require("passport");
var passportJWT = require("passport-jwt");





app.set('port',3000)

//middleware
app.use(function(req,res,next){
    console.log(req.method,req.url);
    next();
});


app.use(express.static(path.join(__dirname,"public")));

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use("/api",routes);





var server=app.listen(app.get('port'),()=>{
    var port=server.address().port;
});