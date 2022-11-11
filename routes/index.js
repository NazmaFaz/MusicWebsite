var express = require('express');
var router = express.Router();
var fs = require('fs');
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/about', function(req, res, next){
  res.render('about')
})

router.get('/gallery', function(req, res, next){
  res.render('gallery')
})

router.get('/contact', function(req, res, next){
  res.render('contact')
})

router.post('/submit', function(req, res, next){
  let name = req.body.name;
  let email = req.body.email;
  let number = req.body.number;
  fs.appendFile('data.txt', `name:${name}, email:${email}, number:${number}\n`, function(error){
    if(error){
      console.log(error)
    }
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'nazmafaz14@gmail.com',
        pass: 'zebtfptxykyzqhvt'
      }
    });
    var mailoptions = {
      from: 'ratedr@gmail.com',
      to: email,
      subject: 'Successfully tickets booked',
      text: 'Congratulation you have successfully booked your ticket for the coming event'
    };
    transporter.sendMail(mailoptions, function(error, info){
      if(error){
        console.log(error)
      }
      else{
        res.render('success')
      }
    })
  })
})
module.exports = router;
