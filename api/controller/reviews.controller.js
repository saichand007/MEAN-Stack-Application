var mongoose=require('mongoose');
var Hotels=mongoose.model('Hotel');

module.exports.reviews=function(req,res){

    var hotelId=req.params.id;

    Hotels
    .findById(hotelId)
    .select('reviews')
    .exec(function(err,rslt){
       
        if(err)
        {
            res
            .status(400)
            .json({"msg":"Review doesnt exist"})
        }
        else{

            res
            .status(200)
            .json(rslt.reviews);
        }
      
    })
};

module.exports.reviewone=function(req,res){

    var hotelId=req.params.id;
    var reviewId=req.params.rid;

    Hotels
    .findById(hotelId)
    .select('reviews')
    .exec(function(err,rslt){
     
        var review=rslt.reviews.id(reviewId);
      
        if(err)
        {
            res
            .status(400)
            .json({"msg":"Review doesnt exist"})
        }
        else{

            res
            .status(200)
            .json(review);
        }
    })
};


var addReview=function(req,res,rslt)
{
    
  rslt.reviews.push({
      name:req.body.name,
      rating:parseInt(req.body.rating,10),
      review:req.body.review
  });

  console.log(rslt.reviews);

  rslt.save(function(err,rsltUpdated){
      if(err)
      {
         
          res
          .status(500)
          .json(err);
         
      }
      else{
          res
          .status(200)
          .json(rsltUpdated.reviews[rsltUpdated.reviews.length - 1]);
      }
  });
};

module.exports.reviewsadd=function(req,res){

    var hotelId=req.params.id;
    console.log("post review",hotelId);

    Hotels
    .findById(hotelId)
    .select('reviews')
    .exec(function(err,rslt){
        console.log(rslt);
        var response={
            status:200,
            message:rslt
        }
   
       
        if(err)
        {
            console.log("error finding hotel");
           response.status=500;
           response.message=err;
           console.log(response.message);
        }
        else if(!rslt)
        {
            console.log("HotelId not found");
            response.status=404;
            response.message={"message":"Hotel Id not found"+hotelId};
        }
    else  if(rslt)
     {
         addReview(req,res,rslt);
         
     }
     else{
         res
         .status(response.status)
         .json(response.message);
     }
      
    });
};

module.exports.reviewupdate=function(req,res,rslt)
{
    var hotelId=req.params.id;
    var reviewId=req.params.rid;

    Hotels
    .findById(hotelId)
    .select('reviews')
    .exec(function(err,rslt){
     
        var review;
        var response = {
            status : 200,
            message : {}
          };
      
        if(err)
        {
            console.log("Error finding hotel");
            response.status = 500;
            response.message = err;
            console.log(err);
        }
        else if(!rslt) {
            console.log("Hotel id not found in database", hotelId);
            response.status = 404;
            response.message = {
              "message" : "Hotel ID not found " + hotelId
            };
        }
        else{

         // Get the review
         review = rslt.reviews.id(reviewId);
         // If the review doesn't exist Mongoose returns null
         if (!review) {
             console.log("no review id");
           response.status = 404;
           response.message = {
             "message" : "Review ID not found " + reviewId
           };
         }
        }

        if (response.status !== 200) {
            res
              .status(response.status)
              .json(response.message);
          } 
        else{
            review.name = req.body.name;
            review.rating = parseInt(req.body.rating, 10);
            review.review = req.body.review;
            rslt.save(function(err, hotelUpdated) {
              if (err) {
                res
                  .status(500)
                  .json(err);
              } else {
                res
                  .status(204)
                  .json();
              }
            });
        }

    });

};

module.exports.reviewdelete=function(req,res)
{
    
    var hotelId=req.params.id;
    var reviewId=req.params.rid;

    Hotels
    .findById(hotelId)
    .select('reviews')
    .exec(function(err,rslt){

        var response={
            status:200,
            message:{}
        }
     
        var review;
      
        if(err)
        {
           response.status=400;
            reponse.message="Review doesnt exist";
        }
    
       
        else if(!rslt)
        {
            response.status=500;
            response.message="Review Id doesnt exist"; 
        }

        else{
            review=rslt.reviews.id(reviewId);
            if(!review)
            {
                response.status=500;
                response.message="Review Id doesn't exist";
            }
        }

        if(response.status!==200)
        {
            res
            .status(response.status)
            .json(response.message);
        }
       
       else
        {
            rslt.reviews.id(reviewId).remove();
            rslt.save(function(err, hotelUpdated) {
              if (err) {
                res
                  .status(500)
                  .json(err);
              } else {
                res
                  .status(204)
                  .json();
              }
            });
        }
    })


}