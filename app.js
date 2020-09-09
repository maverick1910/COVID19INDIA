const express = require("express");

const bodyParser = require("body-parser");
var request = require("request");
const axios = require('axios');


var pdfMake = require('pdfmake/build/pdfmake.js');
var pdfFonts = require('pdfmake/build/vfs_fonts.js');
var con = "Anantapur"; // will have it from req.params

pdfMake.vfs = pdfFonts.pdfMake.vfs;
var data = [];
var status = 0;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use('*/css', express.static('public/css'));
app.use('*/js', express.static('public/js'));
app.use('*/images', express.static('public/images'));


app.get("/", function (req, res) {
    res.render("index");
});

app.get("/e-pass", function (req, res) {
    res.render("e-pass");
});

// var dd = {
// 	content: [
// 		'First paragraph',
// 		'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines'
// 	]

// }


axios.get('https://api.covid19india.org/v4/data.json').then((res) => {
    data = JSON.parse(JSON.stringify(res.data["AP"]["districts"]));
    console.log(data[con].total.confirmed);
    if (data[con].total.confirmed >= data["Chittoor"].total.confirmed) {
        status = 1;
    }
    else { status = 0; }
    console.log(status);
    const pdfRoute = require('./routes/pdfmake')(status);
    app.use('/pdfMake', pdfRoute);
}).catch(function (error) {
    console.log("No res data from api")
})





// app.use('/api',(req,res )=>{


//     console.log(data);
//      res.json(data);});
//      console.log(data);
//  if(data.districts.Anantapur.total.confirmed>=data.districts.Chittoor.total.confirmed)
//   {
//     status=1;
//     }
//    else{   status=0;}
app.get('/register', (req, res) => {
    //    
    res.sendFile(__dirname + '/sample.html');
})



//console.log(data[districts][Anantapur][total][confirmed]);

app.listen(3000, console.log("Server up at 3000"));