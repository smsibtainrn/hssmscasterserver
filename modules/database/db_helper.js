var db_adapter = require('./db_adapter');
// var config = require('../../twilioConfigurations');
// var twilio = require('twilio');
// var twilioLibrary = require('twilio');

/*
 ------------------------------------------------------------------------------------
 Api For Users
 ------------------------------------------------------------------------------------
 */


exports.userAuth = function (data) {
    var query = 'Select * from HSSMSCASTER.dbo.users where user_email_id=\'' + data.email + '\';';
    console.log(query);
    return db_adapter.executeForSingleRecord(query);
};

exports.setAccessToken = function (data, accessToken) {
    var query = 'UPDATE HSSMSCASTER.dbo.users SET HSSMSCASTER.dbo.users.access_token = \'' + accessToken + '\'' +
        ' WHERE HSSMSCASTER.dbo.users.user_id =' + data.user_id + ';';
    console.log(query);
    return db_adapter.executeQuery(query);
};

exports.insertUser = function (data) {
    var query = 'Insert into HSSMSCASTER.dbo.users (user_name,user_email_id,user_contact_no,user_password) ' +
        'values(' + '\'' + data.user_name + '\'' + ',' + '\'' + data.user_email_id + '\'' + ',' + data.user_contact_no + ',' + '\'' + data.user_password + '\');';
    console.log(query);
    return db_adapter.executeQuery(query);
};

exports.getAllUsers = function (data) {
    var query = 'Select * from HSSMSCASTER.dbo.UserContacts where user_id = ' + data.user_id + ';';
    return db_adapter.executeQuery(query);
};

/*
 ------------------------------------------------------------------------------------
 Api For Group
 ------------------------------------------------------------------------------------
 */
exports.getAllGroupsCheck = function (data) {
    var query = 'Select * from HSSMSCASTER.dbo.Groups;';
    // console.log(query);
    return db_adapter.executeQuery(query);
}


exports.getAllGroups = function (data) {
    var query = 'Select * from HSSMSCASTER.dbo.Groups where group_owner_id =' + data.user_id + ';';
    // console.log(query);
    return db_adapter.executeQuery(query);
}

exports.createGroup = function (groupData) {
    var query = 'Insert into HSSMSCASTER.dbo.Groups (group_name,group_description,group_owner_id) OUTPUT INSERTED.group_id ' +
        'values(' + '\'' + groupData.group_name + '\'' + ',' + '\'' + groupData.group_description + '\'' + ','  + groupData.group_owner_id   + ');';
    console.log(query);
    return db_adapter.executeQuery(query);
};


/*
 ------------------------------------------------------------------------------------
 Api For UserContacts
 ------------------------------------------------------------------------------------
 */
exports.addUserContact = function (data) {
    var query = 'Insert into HSSMSCASTER.dbo.UserContacts (user_id,group_id,person_contact_name,person_contact_no) OUTPUT INSERTED.person_id ' +
        'values('+ data.user_id +','+ data.group_id +',\''+data.person_contact_name+'\','+'\''+ data.person_contact_no+'\')';
    console.log(query);
    return db_adapter.executeQuery(query);
}

exports.deleteUserContact = function (data) {
    var query = 'Delete from HSSMSCASTER.dbo.UserContacts where person_id =' + data.person_id + ';';
    console.log(query);
    return db_adapter.executeQuery(query);
}


/*
 ------------------------------------------------------------------------------------
 Api For Messages
 ------------------------------------------------------------------------------------
 */
