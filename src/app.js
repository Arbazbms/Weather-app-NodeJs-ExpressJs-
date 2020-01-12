const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT|| 8000;


publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))


app.set('view engine', 'hbs')
const viewsPath = path.join(__dirname, '../templates/views')
app.set('views', viewsPath)

const partialsPath = path.join(__dirname,'../templates/partials')
hbs.registerPartials(partialsPath)

app.get('/', (req, res) => {
    res.render('index', {

        title: "Weather App",
        Name: 'Arbaz Ahmed'
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
      Name: 'Arbaz Ahmed About'

    })
})



app.get('/help', (req,res) => {
    res.render('help',{
        title: 'HELP',
        Name : 'Arbaz Ahmed help',
        HelpText: 'Help Msg'
    })
})

app.get('/products', (req,res) => {
    
    if(!req.query.search){
       return res.send({
            error: "you must provide a search!"
             
        })
    }

    console.log(req.query.search)

    res.send({
        products:[]    
    })
})







app.get('/weather',(req,res) => { // kind of JSON
   
    if(!req.query.address){
        return res.send({
          error: "you must provide a address!"  
        })

    }

    geocode(req.query.address,(error, { latitude, longitude, location } = {}) => {
            if(error){
                return res.send({ error })
            }

            forecast(latitude, longitude, (error, forecastData) => {
                if(error){
                    return res.send({ error })
                }  

                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address 
                })
            })
        
    })
   
    // res.send({
    //     forecast: 'It is Snowing',
    //     location: 'India',
    //     address:req.query.address
    // })

})








app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page Not Found',
        title: '404',
        Name: 'arbaz 4'

    })
})

app.get('/help/*', (req, res) => {
    res.send('inside help any page!')
})


app.listen(port,() => {
    console.log('Server is Up on Port' + port);
})

