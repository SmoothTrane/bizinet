'use strict';
var key = require("../key")
var request = require('request');
var sync  = require("async");


exports.getWebsites = function(req,res) {
  var keyword = req.params.keyword;
  var type = req.params.type;
  var long = req.params.long;
  var lat = req.params.lat;
  var placesUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + lat+ ','+ long + '&radius=500&type=' + type +
  '&keyword=' + keyword +'&key=' + key.api;
  var noWebsites = [];

  request(placesUrl, function (error, response, body) {
    var data = JSON.parse(body).results;
    var ids = data.map(function(result){
      return result.place_id;
    })
    sync.map(ids, function(id,callback){
      var detailsUrl = 'https://maps.googleapis.com/maps/api/place/details/json?placeid=' + id +'&key='+key.api;

      request(detailsUrl, function(error,response,body){

        var data = JSON.parse(body).result;
        if(data.website === undefined){
          noWebsites.push(data);
        }

        callback(error);

});

    }, function(err, results){
      res.json(noWebsites);

    });

  });

};
