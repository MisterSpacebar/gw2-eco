const axios = require('axios');

module.exports = function (app) {
    app.get('/item/:id',function(req,res){
        var itemData = [];

        axios.get("https://api.guildwars2.com/v2/items/"+req.params.id)
        .then(function(response){
            console.log(response.data);
            itemData.push(response.data);
        }).catch(function(error){
            console.log("item data error:\n"+error);
        }).then(axios.get("https://api.guildwars2.com/v2/commerce/prices/"+req.params.id)
        .then(function(response){
            console.log(response.data);
            itemData.push(response.data);
        }).catch(function(error){
            console.log("item pricing error:\n"+error);
        })
        ).then(function(){
            res.send(itemData);
        });
    });
}