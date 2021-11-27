const express = require('express');
const multer = require('multer');
const path = require('path');

module.exports = function(app) {


    const users = require('../controller/user.controller.js');

    //This is use for multer 
    var storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, './public/images')
        },
        filename: function(req, file, cb) {
                cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
            }
            // filename: (req, file, cb) => {
            //   console.log(file);
            //   var filetype = '';
            //   if(file.mimetype === 'image/gif') {
            //     filetype = 'gif';
            //   }
            //   if(file.mimetype === 'image/png') {
            //     filetype = 'png';
            //   }
            //   if(file.mimetype === 'image/jpeg') {
            //     filetype = 'jpg';
            //   }
            //   cb(null, 'image-' + Date.now() + '.' + filetype);
            // }
    })
    var upload = multer({ storage: storage })



    app.post('/api/AddUser', upload.single('file'), users.AddUser)
    app.post('/api/GetAllUsers', users.GetAllUsers)

}