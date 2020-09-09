var express=require("express");
var app= express();
var bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
var request=require("request");

app.set("view engine","ejs");
app.use('*/css',express.static('public/css'));
app.use('*/js',express.static('public/js'));
app.use('*/images',express.static('public/images'));


app.get("/",function(req,res){
    res.render("index");
});

app.get("/e-pass",function(req,res){
    res.render("e-pass");
});


//This is the Server Localhost
app.listen(3000,function(){
    console.log("The server has started");
});