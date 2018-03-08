var mongoose=require("mongoose");
var User =mongoose.model('User');
var bcrypt=require('bcrypt');
var jwt=require('jsonwebtoken');

module.exports.register=function(req,res){
console.log("user registration");

var username = req.body.username
var name = req.body.name || null;
var password = req.body.password;

User.create({
    username:username,
    name:name,
    password:bcrypt.hashSync(password,bcrypt.genSaltSync(10))
},function(err,user){
    if(err)
    {
        console.log(err);
        res.status(400).json(err);
    }
    else{
        console.log('user created',user);
        res.status(201).json(user);
    }
});
};


module.exports.login=function(req,res)
{
console.log("logging in user");
var username=req.body.username;
var password=req.body.password;

User.findOne({
    username:username
}).exec(function(err,user){
    if(err)
    {
        console.log(err);
        res.status(400).json(err);
    }
    else if(!user || !password)
    {
        console.log("user not found");
        res.status(404).json("user not found");
    }
    else{
        
        if(bcrypt.compareSync(password,user.password))
        {
            console.log("user found",user);
            var token=jwt.sign({username:user.username},'qazwsx3',{expiresIn:600});
            res.status(200).json({success:"ok" ,token:token});
            console.log(token);
        }
        else{
            res.status(401).json('unauthorized')
        }
     
    }
})
};
module.exports.authenticate=function(req,res,next){
    var headerExists=req.headers.authorization;
    if(headerExists)
    {
        var token=req.headers.authorization.split(' ');
        console.log(token);
        jwt.verify(token[1],'qazwsx3',function(error,decoded){
         
            if(error)
            {
                console.log(error);
                res.status(401).json('unauthorized');
            }
            else{
                req.user=decoded.username;
                next();
            }
        });
    }
    else{
        res.status(403).json("no token provided");
    }
};
