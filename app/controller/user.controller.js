const db = require('../config/db.config.js');
const config = require('../config/config.js');
const mime = require('mime');
const fs = require('fs')
const path = require('path');
const sequelize = require('sequelize');
const { QueryTypes } = require('sequelize');
const Op = sequelize.Op;


const User = db.user;


// API for Register New User
exports.AddUser = async(req, res) => {

    if (!req.body.FirstName) {
        return res.status(401).json({ message: ' Please Enter FirstName. ' });
    }
    if (!req.body.LastName) {
        return res.status(401).json({ message: ' Please Enter LastName. ' });
    }
    if (!req.body.MobileNo) {
        return res.status(401).json({ message: ' Please Enter Mobile Number. ' });
    }


    const EmailToValidate = req.body.Email;
    const EmailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const mailcheck = EmailRegexp.test(EmailToValidate);
    if (!mailcheck) {
        console.log(EmailToValidate);
        return res.status(500).json({ message: 'Please Enter A Correct Email like abc@example.com' });
    }
    const mobileno = req.body.MobileNo;
    // const regExp = /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$/;
    const regExp = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/
    const phone = regExp.test(mobileno);
    if (!phone) {

        return res.status(500).json({ message: ' Mobile no is not valid' });
    }

    var user = await User.create({

        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        MobileNo: req.body.MobileNo,
        Email: req.body.Email,
        Address: req.body.Address,
        Image: "http://" + req.headers.host + "/" + req.file.filename,

    })

    res.status(200).json({

        success: '200',
        message: req.body.FirstName + ' has Registered Successfully ',
    });


}


// API for Show all Users
exports.GetAllUsers = (req, res) => {


    User.findAll().then(user => {

        res.status(200).json({

            success: '200',
            message: 'All Users Details',
            User: user
        })

    })

}