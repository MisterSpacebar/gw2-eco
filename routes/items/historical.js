const axios = require('axios');

module.exports = function (app) {
    app.get('/history/:id',function(req,res){
        var historicalData = {
            bought: [],
            sold: []
        };

        axios.get("http://www.gw2spidy.com/api/v0.9/json/listings/"+req.params.id+"/buy/1")
        .then(function(response){
            var buyData = response.data.results;
            for(var i=0 ; i < 150 ; i++){
                historicalData.bought[i] = buyData[i];
                console.log(buyData[i]);
            }
        }).catch(function(error){
            console.log(error);
        })
        .then(axios.get("http://www.gw2spidy.com/api/v0.9/json/listings/"+req.params.id+"/sell/1")
        .then(function(response){
            var sellData = response.data.results;
            for(var j=0 ; j < 150 ; j++){
                historicalData.sold[j] = sellData[j];
                console.log(sellData[j]);
            }
        }).catch(function(error){
            console.log(error);
        })
        ).then(function(){
            res.send(historicalData);
        });
    });
};