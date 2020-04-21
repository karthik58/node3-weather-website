const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define  paths for Express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlesbars engine and view location 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'karthikprudhvi'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'karthikprudhvi'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'karthikprudhvi'
    })
})

app.get('', (req, res) => {

    res.send('<h1>hi hey hello</h1>')

})

app.get('/help', (req, res) => {
    res.send([{
        name: 'Karthik',
        age: 25
    },
    {
        name: 'Karthik',
        age: 25
    },
    {
        name: 'Karthik',
        age: 25
    },
    ])
})

app.get('/about', (req, res) => {
    res.send('<h1>Weather</h1>')
})

app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error: 'provide search term'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {

            if(error){
              return console.log(error)
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
      
          })
    })
    
})

app.get('/products', (req, res) =>{
    
    if(!req.query.search){
        return res.send({
            error: 'provide search term'
        })
    }

    console.log(req.query.search);

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'karthik',
        errorMessage: 'help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'karthik',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port  3000')
})