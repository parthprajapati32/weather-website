const request = require('request')

const forecastfu = (latitude ,longitude ,callback) => {
    const request = require('request')
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat='+ latitude +'&lon='+ longitude +'&appid=cf88f65c4dafb36ad94522c39c3cb3ca'

    request({url,json: true},(error,response) => {
        if(error){
            callback('Unable to connect!' ,undefined)
        }
        else if(response.body.cod === "404"){
            callback('Do not fetch location' ,undefined)
        }
        else{
            callback(undefined , {
                temp: response.body.main.temp - 273.15
            })
        }
    })
}

module.exports = {
    forecastfu
}