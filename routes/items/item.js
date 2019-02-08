const axios = require('axios');

module.exports = function (app) {
    app.get('/api/item/:id',function(req,res){
        var itemData = {
            id:0,
            data:{
                name:"",
                level:0,
                description:"",
                icon:""
            },
            pricing:{
                buy:{
                    quantity:0,
                    price:0
                },
                sell:{
                    quantity:0,
                    price:0
                }
            }
        };

        axios.get("https://api.guildwars2.com/v2/items/"+req.params.id)
        .then(function(response){
            console.log(response.data);
            item = response.data;
            itemData.id = item.id;
            itemData.data.name = item.name;
            itemData.data.description = item.description;
            itemData.data.icon = item.icon;
            itemData.data.level = item.level;
        }).catch(function(error){
            console.log("item data error:\n"+error);
        })
        .then(axios.get("https://api.guildwars2.com/v2/commerce/prices/"+req.params.id)
        .then(function(response){
            console.log(response.data);
            price = response.data;
            itemData.pricing.buy.quantity = price.buys.quantity;
            itemData.pricing.buy.price = price.buys.unit_price;
            itemData.pricing.sell.quantity = price.sells.quantity;
            itemData.pricing.sell.price = price.sells.unit_price;
        }).catch(function(error){
            console.log("item pricing error:\n"+error);
        })
        ).then(function(){
            res.send(itemData);
        });
    });
}