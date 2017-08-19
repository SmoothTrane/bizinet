'use strict';
var path = require('path');
var request = require('request');
var key = require("../key")
var sync  = require("async");



module.exports = function(app) {
  var mainController = require("../controllers/MainController");



app.get("/", function(req, res){
  res.sendFile(path.join(__dirname, '../views', 'index.html'))
});

    app.get('/getWebsites/:keyword/:type/:long/:lat', function(req, res) {
      mainController.getWebsites(req,res);
    });


};
