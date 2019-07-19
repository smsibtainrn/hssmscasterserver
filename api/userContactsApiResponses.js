/**
 * Created by Sibtain Raza on 1/9/2017.
 */

var express = require('express');
var db_helper = require("../modules/database/db_helper");
// var util = require('util');

var router = express.Router();

router.post("/addUserContact",function (req,res) {
    var userContactData = req.body;
    console.log(userContactData);
    db_helper.addUserContact(userContactData).then(function (data) {
        console.log(data[0].person_id);
        res.send({is_executed:true,person_id:data[0].person_id});
    });
    
});

router.post("/deleteUserContact",function (req,res) {
    var userContactData = req.body;
    console.log(userContactData);
    db_helper.deleteUserContact(userContactData);
});

router.post("/getAllUserContacts",function (req,res) {
    var userContactData = req.headers;
    console.log(userContactData);
    db_helper.getAllUsers(userContactData);
});

module.exports = router;