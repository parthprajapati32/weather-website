const request = require('request')

const geocodefu = (address ,callback)=>{
    
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address +'.json?access_token=pk.eyJ1IjoiaGVhZGh1bnRlcjMyIiwiYSI6ImNrYXFqb2thcjA1a24zM2xyMm44ZjI1bmcifQ.G_iH0o-eFAVUug-sbZIVrg&limit=1'

    request({url,json: true} ,(error,response) => {
        if(error){
            callback('Unable to connect' ,undefined)
        }
        else if(response.body.features.length === 0){
            callback('Do not fatch location' ,undefined)
        }
        else{
            callback(undefined ,{
                latitude: response.body.features[0].geometry.coordinates[1],
                longitude: response.body.features[0].geometry.coordinates[0],
                location:   response.body.features[0].place_name
            })
        }
    })
}

module.exports = {
    geocodefu
}