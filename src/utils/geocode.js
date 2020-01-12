const request = require('request')

const geocode = (address,callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYXJiYXpibXMiLCJhIjoiY2s1MHYyOTcxMG8wMjNtbXFmeDZycTBiNSJ9.9rKwuliIo_7VjXR6EvF1qg&limit=1';
    request({ url: url,json:true }, (error,response) =>{
        if(error){
            callback('Unable to connect to weather services!',undefined)
        }else if(response.body.features.length === 0){

                callback('Unable to find location. Try Another search!',undefined)
        }else{
            callback(undefined,{
                latitude : response.body.features[0].center[1],
                longitude: response.body.features[0].center[0], 
                location : response.body.features[0].place_name
            })
        }

    })
}

module.exports = geocode