var multer = require('multer');
var path = require('path');
const Promise = require('bluebird');

var _uploadPath = "./";
var _allowedExtensions = [".png", ".gif", ".jpg"];

var _fileNameWrapper = function (request, file, callback) {
    console.log(file);

    callback(null, file.originalname);
}

exports.setFileNameModifier = function (filenameModifier) {
    _fileNameWrapper = filenameModifier;
}

exports.addAcceptedExt = function (ext) {
    _allowedExtensions.push(ext);
}

exports.setUploadPath = function (uploadPath) {
    _uploadPath = uploadPath;
}

exports.upload = function (fileKey, request, response) {
    var storage = multer.diskStorage({
        destination: function (request, file, callback) {
            callback(null, _uploadPath);
        },
        filename: _fileNameWrapper
    });
    
    var upload = multer({
        storage: storage,
        fileFilter: function (req, file, callback) {
            var ext = path.extname(file.originalname)
            if (_allowedExtensions.indexOf(ext) < 0) {
                return callback(response.end('Only images are allowed'), null)
            }
            callback(null, true);
        }
    }).single(fileKey);

    return new Promise(function (resolve, reject) {
        upload(request, response, function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(request, response);
        });
    });
}
