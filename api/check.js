/**
 * Created by Sibtain Raza on 5/1/2017.
 */

var express = require('express');
var router = express.Router();


router.post("/addGroup", function (req, res) {
        res.send({is_executed:true,group_id:1});
});

module.exports = router;