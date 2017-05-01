/**
 * Created by Sibtain Raza on 1/9/2017.
 */

var express = require('express');
var db_helper = require("../modules/database/db_helper");
var uploader = require("../modules/uploader/uploader");
// var util = require('util');

var router = express.Router();

router.post("/sendMessage",function (req,res) {
   
    uploader.upload("SendMessage", req, res).then(function (data) {

        var sendMessageData = req.body;
        
        db_helper.sendMessage(sendMessageData).then(function (data) {
            res.json({isExecuted : true});
        });
    }).catch(function (err) {
        if (err) {
            console.log('Error Occured', err);
            res.end('Error Occured');
        }
    });

});

module.exports = router;