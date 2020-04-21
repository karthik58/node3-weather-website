const request = require('request')

forecast = (latitide, longitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=47bccde4421bad4cbe384e170966cfee&query=' + latitide + ',' + longitude

    request({url, json: true}, (error, {body}) =>{
        if(error){
            console.log('connection error')
        }else if (body.error){
            console.log('try again');
        }else{
            callback( undefined, {
                placename: body.location.name,
                temperature: body.current.temperature,
                feelslike: body.current.feelslike
            })
        }
    })

}

module.exports = forecast