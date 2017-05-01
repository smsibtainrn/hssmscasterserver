/**
 * Created by Sibtain Raza on 5/1/2017.
 */

var express = require('express');
var app = express();
var router = express.Router();

var db_helper = require('../modules/database/db_helper');

router.get("/addGroup", function (req, res) {
        res.send({is_executed:true,group_id:1});

        /*var groupData = req.body;
        console.log(groupData);
        db_helper.createGroup(groupData).then(function (data) {
                // data.is_executed = true;
                console.log(data[0].group_id);
                res.send({is_executed:true,group_id:data[0].group_id});
        });*/
});

module.exports = router;