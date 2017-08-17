'use strict';
var path = require('path');
var request = require('request');
var key = require("../key")
var sync  = require("async");



module.exports = function(app) {


    app.get('/tdt', function(req, res) {
      // res.sendFile(path.join(__dirname, '../views', 'index.html'));
      getPlaces();

      function getPlaces(){
        var noWebsites = [];
        request('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=41.716514,-73.924225&radius=500&type=restaurant&keyword=store&key=' + key.api, function (error, response, body) {
          var data = JSON.parse(body).results;
          var ids = data.map(function(result){
            return result.place_id;
          })
          sync.map(ids, function(id,callback){
            request('https://maps.googleapis.com/maps/api/place/details/json?placeid=' + id +'&key=AIzaSyBrIc-FHyebnQTIiXDRR2bJne-dwuqgY2k', function(error,response,body){

              var data = JSON.parse(body).result;
              if(data.website === undefined){
                noWebsites.push(data);
              }


              callback(error);

      });



          }, function(err, results){
            res.json(noWebsites);

          });
          // for(var i=0;i<ids.length;i++){
          //   getWebsites(ids[i]);
          // }

        });
      }


        //
        // function getWebsites(ids,key){
        //   var noWebsites = [];
        //
        //   request('https://maps.googleapis.com/maps/api/place/details/json?placeid=' + id +'&key=AIzaSyBrIc-FHyebnQTIiXDRR2bJne-dwuqgY2k', function(error,response,body){
        //
        //       var data = JSON.parse(body).result;
        //       if(data.website === undefined){
        //         noWebsites.push(data);
        //       }
        //
        //   });
        //
        // }
    });


};
