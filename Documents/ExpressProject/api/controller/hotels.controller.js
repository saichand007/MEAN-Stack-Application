
var mongoose=require('mongoose');
var Hotels=mongoose.model('Hotel');
const jwt = require('jsonwebtoken');




module.exports.hotels=function(req,res){

    var offset=0;
    var count=10;
    var maxcount=50;

  

    if(req.query && req.query.offset)
    {
        offset=parseInt(req.query.offset,10);
        console.log(offset);
    }

    if(req.query && req.query.count)
    {
        offset=parseInt(req.query.count,10);
    }

    if(isNaN(offset) || isNaN(count))
    {
        res
        .status(404)
        .json({"message":"need offset and count values"});
        return;
    }

    if(count > maxcount)
    {
        console.log("exceded");
        res
        .status(400)
        .json({ "msg": "Exceeding count="+ maxcount +" limit" });

        return;
     }

    Hotels
    .find()
    .skip(offset).limit(count)
    .exec(function(err,rslt){
        if(err)
        {
            console.log("Error in finding hotels");
            res
            .status(500)
            .json(err);
        }
     
        else{
            res
            .status(200)
            .json(rslt);

  
           
        }
    });


};

module.exports.hotelone=function(req,res){
   
    var hotelId=req.params.id;
   
    Hotels
    .findById(hotelId)
    .exec(function(err,rslt){

        var response={
            status:200,
            message:rslt
        }

        if(err)
        {
            console.log("error");
            response.status=500;
            response.message=err;
        }
        else if(!rslt){
            console.log("Id doesn't exist");
           response.status=404;
           response.message=err;
        }
        else{
            res
            .status(response.status)
            .json(response.message);
        }
       
    });

  
};

var splitArray= function(input)
{
    var output;
    if(input && input.length >0)
    {
        output=input.split(";");
    }
    else{
        output=[];
    }
    return output;
};

module.exports.hoteladd=function(req,res){
   console.log("new hotel");

   Hotels
   .create({
       name:req.body.name,
       description:req.body.description,
       stars:parseInt(req.body.stars,10),
       services:splitArray(req.body.services),
       photos:splitArray(req.body.photos),
       currency:req.body.currency,
       location:{
           address:req.body.address,
           coordinates:[parseFloat(req.body.long),parseFloat(req.body.lat)]
       }
   }, function(err,rslt){
       if(err)
       {
           console.log("error creating hotel");
           res
           .status(400)
           .json(err);
       }

       else{
           console.log("hotel created",rslt);
           res
           .status(201)
           .json(rslt);
       }
   })
    
};


module.exports.hotelupdate=function(req,res){

    var hotelId=req.params.id;
   
    Hotels
    .findById(hotelId)
    .select('-reviews -rooms')
    .exec(function(err,rslt){

        var response={
            status:200,
            message:rslt
        }

        if(err)
        {
            console.log("error");
            response.status=500;
            response.message=err;
        }
        else if(!rslt){
            console.log("Id doesn't exist");
           response.status=404;
           response.message=err;
        }
        else{
            res
            .status(response.status)
            .json(response.message);
        }

        if(response.status!==200)
        {
            console.log("working");
            res
            .status(response.status)
            .json(response.json);
        }

        else
        {
           rslt.name=req.body.name;
            rslt.description=req.body.description;
            rslt.stars=parseInt(req.body.stars,10);
            rslt.services=splitArray(req.body.services);
            rslt.photos=splitArray(req.body.photos);
            rslt.currency=req.body.currency;
            rslt.location={
                address:req.body.address,
                coordinates:[parseFloat(req.body.long),parseFloat(req.body.lat)]
            };

            rslt.save(function(err,updatedreview)
            {
                if(err)
                {
                    res
                    .status(500)
                    .json(err);
                }
                else
                {
                    res
                    .status(204)
                    .json(); 
                }
            });
            
        }

   
       
    });
};


module.exports.hoteldelete=function(req,res)
{
  
    var hotelId = req.params.id;

    Hotels
      .findByIdAndRemove(hotelId)
      .exec(function(err, location) {
        if (err) {
          res
            .status(404)
            .json(err);
        } else {
          console.log("Hotel deleted, id:", hotelId);
          res
            .status(204)
            .json();        
        }
      });
};

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
      // Split at the space
      const bearer = bearerHeader.split(' ');
      // Get token from array
      const bearerToken = bearer[1];
      // Set the token
      req.token = bearerToken;
      // Next middleware
      next();
    } else {
      // Forbidden
      res.sendStatus(403);
    }
  
  }