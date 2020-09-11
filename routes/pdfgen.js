const express =require('express');
const axios=require('axios');
const bodyParser = require("body-parser");
const router=express.Router();

var pdfMake = require('pdfmake/build/pdfmake.js');
var pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var con="Anantapur"

axios.get('https://api.covid19india.org/v4/data.json').then((res) => {
    data = JSON.parse(JSON.stringify(res.data["AP"]["districts"]));
    console.log(data[con].total.confirmed);
    
}).catch(function (error) {
    console.log("No res data from api")
})

router.post('/pdfgen',urlencodedParser,(req,res,next)=>{
    console.log(data);
    

    console.log(req.body);
  
   
//     if(data[req.body.destination].total.confirmed <= data[req.body.source].total.confirmed){
//     var dd = {
//         content: [
//             `hello ${req.body.firstName}`,
//             `Source: ${req.body.source}`,
//             `Destination: ${req.body.destination}`,
//             'Approved paragraph',
//             'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines'
//         ]        
//     };
// }
// else{
//     var dd = {
//         content: [
//             `hello ${req.body.firstName}`,
//             `Source: ${req.body.source}`,
//             `Destination: ${req.body.destination}`,
//             'Rejected paragraph',
//             'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines'
//         ]        
//     };
// }

var dd = {
	content: [
		'First paragraph',
		'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines'
	]
	
}
    
    const pdfDoc=pdfMake.createPdf(dd);
    
    
    pdfDoc.getBase64((data) => {
        res.writeHead(200,
            {
                'Content-Type':'application/pdf',
                'Content-Disposition':'attachment;filename="filename.pdf"'
            });
            const download=Buffer.from(data.toString('utf-8'),'base64');
            res.end(download);
    });
    res.render('/e-pass');
})




module.exports=router;