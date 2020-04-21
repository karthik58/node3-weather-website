const request = require('request')

const forecast = (latitide, longitude, callback) =>{
    const url = 'https://api.weatherstack.com/current?access_key=47bccde4421bad4cbe384e170966cfee&query=' + latitide + ',' + longitude

    request({ url, json: true }, (error, { body }) =>{
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error){
            callback('Unable to find location', undefined)
        }else{
            callback( undefined, 
                // {
                //     placename: body.location.name,
                //     temperature: body.current.temperature,
                //     feelslike: body.current.feelslike
                // },

            ' It is currently ' + body.current.temperature + ' degress out. There is a ' + body.current.precip + '% chance of rain.'


            )
        }
    })

}

module.exports = forecast