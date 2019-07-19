/**
 * Created by Sibtain Raza on 1/9/2017.
 */

var express = require('express');

var db_helper = require("../modules/database/db_helper");
// var uploader = require("../modules/uploader/uploader");

var router = express.Router();

router.post("/signIn", function (req, res) {
    console.log("User Login");
    var body = req.body;
    console.log(body);
    var response = {};
    var email = body.email;
    var password = body.password;

    console.log(email);

    db_helper.userAuth(body).then(function (data) {
        var userObj = data;
        if (userObj == null) {
            response.message = "User Does Not Exists";
            response.status = "-1";
            res.json(response);
            console.log("User Does Not Exists");
            return;
        }
        else {
            console.log(userObj);
            console.log(userObj.user_email_id);
            if (userObj.password == password) {

                response.message = "Welcome To HSSMSCASTER";
                response.status = "1";
                var accessToken = userObj.user_email_id + Date.now();
                console.log("-Access-", accessToken);
                db_helper.setAccessToken(userObj, accessToken).then(function (data) {
                });
                response.user_id = userObj.user_id;
                response.user_name = userObj.user_name;
                response.user_email_id = userObj.user_email_id;
                response.access_token = accessToken;
                res.json(response);
                console.log(response);
            }

            else {
                response.message = "Incorrect Email or Password";
                response.status = "fail";

                res.json(response);
                console.log("Incorrect Email or Password")
            }
        }
    }).catch(function (err) {
        if (err) {
            response.message = "database error";
            response.status = "fail";
            res.json(response);
            console.log(err);
        }
    });
});

router.post("/insertUser", function (req, res) {
    var groupData = req.body;
    console.log(groupData);
    db_helper.insertUser(groupData);
});


router.post("/updateProfile", function (request, response) {
    var form = new multiparty.Form();

    form.parse(request, function (err, fields, files) {//header userId
        // console.log(fields.userName[0]);        //user_username
        // console.log(fields.userContact[0]);     //user_contact
        // console.log(fields.userPassword[0]);    //user_password
        // console.log(fields.userDesignation[0]); //user_designation

        var profileData = {};
        // profileData.userName = fields.userName[0];
        // profileData.userContact = fields.userContact[0];
        // profileData.userPassword = fields.userPassword[0];
        // profileData.userDesignation = fields.userDesignation[0];

        console.log(profileData);
    });
    var array = [];
    uploader.setUploadPath("./uploadedImages/userProfileImages");
    uploader.setFileNameModifier(function (req, file, callback) {
        console.log("Modifying FileName");
        var imageName = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
        array.push(imageName);
        callback(null, imageName);
    });

    uploader.upload("avatar", request, response).then(function () {
        console.log("2----", request.body);

        //response.end('Your File Uploaded');
        console.log('Photo Uploaded');
        var imageName = request.file.filename;
        console.log("UserImage Name: " + imageName);

        db_helper.updateUserProfile(imageName).then(function (res) {
            db_helper.getUserInfo(1).then(function (res) {
                console.dir(res);
            })
        });

        response.end('Your File Uploaded');
    }).catch(function (err) {
        if (err) {
            console.log('Error Occured', err);
            response.end('Error Occured');
        }
    });
});

router.get("/getAllUsers", function (req, res) {
    console.log("Running getAllUsers");
    console.log("Current Login User: " + req.headers.groupDesc);
    db_helper.getAllUsers().then(function (data) {
        console.log(data);
        res.json(data);
    });
});

router.get("/getAllUsers1", function (req, res) {
    console.log("Running getAllUsers");
    db_helper.getAllUsers1().then(function (data) {
        console.log(data);
        res.json(data);
    });
});

router.post("/insertUser1", function (req, res) {
    console.log("Running insertUser1");
    db_helper.insertUser1().then(function (data) {
        console.log(data);
        res.json(data);
    });
});


module.exports = router;
