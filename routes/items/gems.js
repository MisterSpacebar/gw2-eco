const axios = require('axios');

module.exports = function (app) {
    app.get('/api/exchange',function(req,res){
        var gemData;
        axios.get("https://api.guildwars2.com/v2/commerce/exchange/gems?quantity=1000")
        .then(function(response){
            gemData = response.data;
            console.log(gemData);
        }).catch(function(error){
            console.log(error);
        }).then(function(){
            res.send(gemData);
        });
    });
};