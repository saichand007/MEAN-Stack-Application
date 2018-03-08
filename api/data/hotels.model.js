var mongoose=require("mongoose");

var roomsSchema=new mongoose.Schema({
    type:String,
    number:Number,
    description:String,
    photos:[String],
    price:Number
});

var reviewsSchema=new mongoose.Schema({
    name : {
        type : String,
        required : true
      },
      rating : {
        type : Number,
        required : true,
        min : 0,
        max : 5
      },
      review : {
        type : String,
        required : true
      },
      createdOn : {
        type : Date,
        "default" : Date.now
      }
});

var hotelSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    stars:{
        type:Number,
        min:0,
        max:5,
        "default":0
    },
  description:String,
    photos:[String],
    currency:[String],
    services:[String],
    rooms:[roomsSchema],
   reviews:[reviewsSchema],
   location:{
       address:String,
       coordinates:{
         type :[Number],
       index:'2dSphere'
              }
       }
   
});

mongoose.model("Hotel",hotelSchema,"hotels");