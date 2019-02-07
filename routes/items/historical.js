const axios = require('axios');
// Load the full build.
const _ = require('lodash');
// Load the core build.
//const _ = require('lodash/core');
// Load the FP build for immutable auto-curried iteratee-first data-last methods.
const fp = require('lodash/fp');

function returnArray(jsonArray){
    data = [];
    for(var b=0 ; b < jsonArray.length ; b++){
        data[b] = {
            listing_datetime: jsonArray[b].listing_datetime.slice(0,10),
            unit_price: jsonArray[b].unit_price,
            quantity: jsonArray[b].quantity,
            listings: jsonArray[b].listings
        }
    }
    return data
}

module.exports = function (app) {
    app.get('/history/:id',function(req,res){
        var historicalData = {
            buying: [],
            selling: []
        };

        axios.get("http://www.gw2spidy.com/api/v0.9/json/listings/"+req.params.id+"/buy/1")
        .then(function(response){
            var buyData = returnArray(response.data.results);
            // for(var i=0 ; i < 150 ; i++){
            //     historicalData.bought[i] = buyData[i];
            //     console.log(buyData[i]);
            // // }            
            // var y = _.uniqBy(z, (Q)=>Q);

            // filters historical data and returns highest daily transaction for last 28 days
            var filteredBuy = _.uniqBy(buyData,'listing_datetime');
            var buyFilter = filteredBuy.map((item)=>item.listing_datetime);

            buyResult = [];
            buyFilter.forEach((date)=>{
                //console.log(q.filter((item)=>item.listing_datetime === date).sort((item)=>item.unit_price)[0])
                console.log(buyData.filter((item)=>item.listing_datetime === date));
                buyResult.push(buyData.filter((item)=>item.listing_datetime === date)[0]);
            });
            for(var i=0 ; i < 28 ; i++){
                historicalData.buying[i] = buyResult[i];
            }
        }).catch(function(error){
            console.log(error);
        })
        .then(axios.get("http://www.gw2spidy.com/api/v0.9/json/listings/"+req.params.id+"/sell/1")
        .then(function(response){
            var sellData = returnArray(response.data.results);
            // for(var j=0 ; j < 150 ; j++){
            //     historicalData.sold[j] = sellData[j];
            //     console.log(sellData[j]); 
            // }

            // filters historical data and returns highest daily transaction for last 28 days
            var filteredSell = _.uniqBy(sellData,'listing_datetime');
            var sellFilter = filteredSell.map((item)=>item.listing_datetime);

            sellResult = [];
            sellFilter.forEach((date)=>{
                //console.log(q.filter((item)=>item.listing_datetime === date).sort((item)=>item.unit_price)[0])
                console.log(sellData.filter((item)=>item.listing_datetime === date));
                sellResult.push(sellData.filter((item)=>item.listing_datetime === date)[0]);
            });
            for(var j=0 ; j < 28 ; j++){
                historicalData.selling[j] = sellResult[j];
            }
        }).catch(function(error){
            console.log(error);
        })
        ).then(function(){
            res.send(historicalData);
        });
    });
};