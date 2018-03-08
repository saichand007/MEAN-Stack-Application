var express=require('express');
var router=express.Router();
var hotelctrl=require('../controller/hotels.controller');
var reviewctrl=require('../controller/reviews.controller');
var userctrl=require("../controller/users.controller");

//Routes for Authentication
router
.route("/users/register")
.post(userctrl.register);

router
.route("/users/login")
.post(userctrl.login);

//Routes for hotels...
router
  .route("/hotels")
  .get(userctrl.authenticate,hotelctrl.hotels )
  .post(hotelctrl.hoteladd);


  router
  .route("/hotels/:id")
  .get(userctrl.authenticate,hotelctrl.hotelone)
  .put(hotelctrl.hotelupdate)
  .delete(hotelctrl.hoteldelete);
  

 

  //Routes for reviews...
router
.route("/hotels/:id/reviews")
.get(reviewctrl.reviews)
.post(reviewctrl.reviewsadd);

router
.route("/hotels/:id/reviews/:rid")
.get(reviewctrl.reviewone)
.put(reviewctrl.reviewupdate)
.delete(reviewctrl.reviewdelete);

module.exports=router;

