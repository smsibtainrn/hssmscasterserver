/**
 * Created by Sibtain Raza on 1/9/2017.
 */
var express = require('express');
// var path = require('path');
// var fs = require('fs');
// var multiparty = require('multiparty');
// var util = require('util');

var db_helper = require("../modules/database/db_helper");
// var uploader = require("../modules/uploader/uploader");

var router = express.Router();

router.post("/addGroup", function (req, res) {
    var groupData = req.body;
    console.log(groupData);
    db_helper.createGroup(groupData).then(function (data) {
        // data.is_executed = true;
        console.log(data[0].group_id);
        res.send({is_executed:true,group_id:data[0].group_id});
    });
});

router.get("/check1",function (req, res) {
    response.send({is_executed:true});
});

router.post("/updateGroup", function (req, res) {
    var groupData = req.body;
    console.log(groupData);
    db_helper.updateGroup(groupData);
});

router.post("/deleteGroup", function (req, res) {
    var groupData = req.body;
    console.log(groupData);
    db_helper.deleteGroup(groupData);
});

router.get("/getAllGroups", function (req, res) {
    console.log("Running getAllGroups");
    db_helper.getAllGroups(req.headers).then(function (data) {
        data.isExecuted = {isExecuted : true};
        console.log(data)
        res.json(data);
    });
});

router.get("/getAllUserGroups", function (req, res) {
    console.log("Running getAllUserGroupMembership");
    db_helper.getAllUserGroupMembership().then(function (data) {
        console.log(data);
        res.json(data);
    });
});

module.exports = router;