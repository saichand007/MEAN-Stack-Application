
 
var MongoClient=require("mongodb").MongoClient;
var url="mongodb://localhost:27017";

var connection=null;

var open =function(){
   //set connection
  MongoClient.connect(url,function(err,db){
       if(err)
       {
           console.log(err);
       }
       else{

        connection=db.db('meanhotels');
       
       
       }

   });
};




var get =function(){

  
    return connection;

};


module.exports={
    open:open,
    get:get
};