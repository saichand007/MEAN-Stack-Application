var mongoose=require('mongoose');
var url="mongodb://localhost:27017/meanhotels";

mongoose.connect(url);

mongoose.connection.on("connected",function(){
    console.log("connected:-"+url);
});

mongoose.connection.on("disconnected",function(){
    console.log("not connected");
});

mongoose.connection.on("error",function(error){
    console.log("error:-"+error);
});

process.on('SIGINT',function(){
    mongoose.connection.close(function(){
        console.log("App terminated");
        process.exit(0);
    })
});
process.on('SIGTERM',function(){
    mongoose.connection.close(function(){
        console.log("App terminated");
        process.exit(0);
    })
});

process.on('SIGUSR2',function(){
    mongoose.connection.close(function(){
        console.log("App terminated");
        process.kill(process.pid,'SIGUSR2');
    })
});

//getting schema amd model
require("./hotels.model")
require("./users.model");