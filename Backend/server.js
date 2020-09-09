const express =require('express');
const axios =require('axios');
var status=0;
var pdfMake = require('pdfmake/build/pdfmake.js');
var pdfFonts = require('pdfmake/build/vfs_fonts.js');
var con = "Anantapur"; // will have it from req.params

pdfMake.vfs = pdfFonts.pdfMake.vfs;
var data=[];

const app=express();

// var dd = {
// 	content: [
// 		'First paragraph',
// 		'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines'
// 	]
	
// }


axios.get('https://api.covid19india.org/v4/data.json').then((res)=>{
        data = JSON.parse(JSON.stringify(res.data["AP"]["districts"]));
        console.log(data[con].total.confirmed);    
 if(data[con].total.confirmed>=data["Chittoor"].total.confirmed)
  {
       status=1;
    }
    else{   status=0;}
    console.log(status);
    const pdfRoute=require('./pdfmake')(status);
app.use('/pdfMake',pdfRoute);
    }).catch(function (error){
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
app.get('/',(req,res)=>{
//    
res.sendFile(__dirname +'/index.html');
})



//console.log(data[districts][Anantapur][total][confirmed]);

app.listen( 3000,console.log("Server up at 3000"));