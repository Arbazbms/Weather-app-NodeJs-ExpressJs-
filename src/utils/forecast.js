const request = require('request')

const forecast = (latitude, longitude,callback) =>{
    const url = 'https://api.darksky.net/forecast/641163bd29f9a258918a28ede6966464/' + latitude + ','+ longitude + '?units=si'

    request({url: url,json:true}, (error,response)=>{
        if(error){
            callback('Unable to connect to weather service!',undefined)


        }else if(response.body.error){
            callback('Unable to find location!',undefined)
        } else{

            callback(undefined,response.body.daily.data[0].summary + 'it is currently ' + response.body.currently.temperature + ' degree out' + ' There is a ' + response.body.currently.precipProbability + '% chance of rain')

        }
    })
}

module.exports = forecast