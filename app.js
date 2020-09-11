const express = require("express");
const axios =require("axios");
const bodyParser = require("body-parser");
var request = require("request");
var collection=require('./collections/collection');


var pdfMake = require('pdfmake/build/pdfmake.js');
var pdfFonts = require('pdfmake/build/vfs_fonts.js');

pdfMake.vfs = pdfFonts.pdfMake.vfs;


const app = express();
app.use(bodyParser.urlencoded({extended:false}));

app.set("view engine", "ejs");
app.use('*/css', express.static('public/css'));
app.use('*/js', express.static('public/js'));
app.use('*/images', express.static('public/images'));


app.get("/", function (req, res) {
    res.render("index");
});


app.get("/e-pass", function (req, res) {
    res.render("e-pass",{collection:collection});
});

app.post("/status",function(req,res){
    var fname=req.body.fname;
    var lname=req.body.lname;
    var email=req.body.email;
    var idcard=req.body.idcard;
    var source=req.body.source;
    var destination=req.body.destination;
    var dest_state=req.body.dest_state;
    var trip=req.body.trip;
    console.log(req.body);
    axios.get('https://api.covid19india.org/v4/data.json').then((res) => {
    var data = JSON.parse(JSON.stringify(res.data));
    console.log(data[dest_state]["districts"][destination].total.confirmed);
   
    
    
}).catch(function (error) {
    console.log("No res data from api")
})
var totalpop=data[dest_state]["districts"][destination].meta.population;
var confirmed=data[dest_state]["districts"][destination].total.confirmed;
console.log(confirmed/totalpop);
if(confirmed/totalpop <0.3){
    var status="Approved";
}
else{
    var status="Rejected";
}
    res.render("status",{data:req.body,status:status});

});

app.post('/test', function(req,res){
    console.log(req.body);
})
const pdfRoute = require('./routes/pdfgen');
    app.use('/', pdfRoute);



app.get('/register', (req, res) => {
       
    res.sendFile(__dirname + '/sample.html');
})


app.listen(3000, console.log("Server up at 3000"));




// axios.get('https://api.covid19india.org/v4/data.json').then((res) => {
//     data = JSON.parse(JSON.stringify(res.data["AP"]["districts"]));
//     console.log(data[con].total.confirmed);
    
// }).catch(function (error) {
//     console.log("No res data from api")
// })

// app.use('/e-passgen', urlencodedParser, function (req, res) {
//     console.log(data);

//     console.log(req.body);
//     if (data[con].total.confirmed >= data["Chittoor"].total.confirmed) {
//         status = 1;
//     }
//     else { status = 0; }
//     console.log(status);
//     const pdfRoute = require('./routes/pdfmake')(status,req.body);
//     app.use('/pdfMake', pdfRoute);
//     res.send('welcome, ' + req.body.username)
//   })


// app.use('/api',(req,res )=>{


//     console.log(data);
//      res.json(data);});
//      console.log(data);
//  if(data.districts.Anantapur.total.confirmed>=data.districts.Chittoor.total.confirmed)
//   {
//     status=1;
//     }
//    else{   status=0;}