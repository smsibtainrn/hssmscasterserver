/**
 * Created by Sibtain Raza on 1/9/2017.
 */var sql = require("mssql");
var express = require('express');
// var path = require('path');
// var fs = require('fs');
// var multiparty = require('multiparty');
// var util = require('util');

var db_helper = require('../modules/database/db_helper');
// var uploader = require("../modules/uploader/uploader");

var router = express.Router();

router.post("/addGroup", function (req, res) {
    var groupData = req.body;
    console.log(groupData);
    db_helper.createGroup(groupData).then(function (data) {
        // data.is_executed = true;
        // console.log(data[0].group_id);
        res.json({is_executed:true,group_id:data[0].group_id});
    });
});


router.get("/check1", function (req, res) {
    res.send({is_executed:true,group_id:2});

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

router.get("/getAllGroupsCheck", function (req, res) {
    var dbConfig = {
        server: 'hssmscaster.database.windows.net', // You can use 'localhost\\instance' to connect to named instance
        database : 'HSSMSCASTER',
        user: 'Smsrn',
        password: 'Persia123',
        // port: 1433,

        // Since we're on Windows Azure, we need to set the following options
        options: {
            encrypt: true

        }
    };

// This function connects to a SQL server, executes a SELECT statement,
// and displays the results in the console.
    function getCustomers() {
        // Create connection instance
        var conn = new sql.connect(dbConfig)
        // Successfull connection
            .then(function () {

                // Create request instance, passing in connection instance
                var req = new sql.Request().query("SELECT * FROM HSSMSCASTER.dbo.Groups;")
                    .then(function (recordset) {
                        console.log(recordset);
                        res.send(recordset);
                        // conn.close();
                    })
                    // Handle sql statement execution errors
                    .catch(function (err) {
                        console.log(err);
                        // /  conn.close();
                    })

            })
            // Handle connection errors
            .catch(function (err) {
                console.log(err);
                // conn.close();
            });
    }


    getCustomers();
});

router.get("/getAllUserGroups", function (req, res) {
    console.log("Running getAllUserGroupMembership");
    db_helper.getAllUserGroupMembership().then(function (data) {
        console.log(data);
        res.json(data);
    });
});

module.exports = router;