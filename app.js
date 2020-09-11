const express = require("express");

const bodyParser = require("body-parser");
var request = require("request");
var collection=require('./collections/collection');


var pdfMake = require('pdfmake/build/pdfmake.js');
var pdfFonts = require('pdfmake/build/vfs_fonts.js');

pdfMake.vfs = pdfFonts.pdfMake.vfs;


const app = express();


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