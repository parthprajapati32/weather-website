const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(__filename)
// console.log(path.join(__dirname,'../public'))

const app = express()

const pathtopublic = path.join(__dirname,'../public')
const viewspath = path.join(__dirname ,'../templates/views')
const partialspath = path.join(__dirname , '../templates/partials')

app.set('view engine' , 'hbs')
app.set('views' ,viewspath)
hbs.registerPartials(partialspath)

app.use(express.static(pathtopublic))

app.get('' ,(req ,res) => {
    res.render('index' , {
        title: 'Weather',
        name: 'Parth Prajapati'
    })
})

app.get('/about' ,(req ,res) => {
    res.render('about' , {
        title: 'About',
        name: 'Parth Prajapati'
    })
})

app.get('/help' ,(req ,res) => {
    res.render('help' , {
        title: 'Help',
        helptext: 'what type of help you needed.',
        name: 'Parth Prajapati'
    })
})

app.get('/weather' ,(req ,res) => {

    if(!req.query.address){
        return res.send({
            error: 'query address field not found'
        })
    }

    geocode.geocodefu( req.query.address , (error , {latitude,longitude,location} = {} ) => {
        if(error){
            return res.send({error})
        }

        forecast.forecastfu( latitude ,longitude , (error , {temp}) => {
            if(error){
                return res.send({error})
            }

            res.send({
                temp,
                location,
                address: req.query.address
            })
        })
    })
    // console.log(req.query)
    // res.send({
    //     forecast: 'summer',
    //     location: 'surat',
    //     address: req.query.address
    // })
})

app.get('/help/*' ,(req ,res) => {
    res.render('404' , {
        title: '404 not found',
        errormsg: 'Help text not found',
        name: 'Parth Prajapati'
    })
})

app.get('*' ,(req ,res) => {
    res.render('404' , {
        title: '404 Not Found',
        name: 'Parth prajapati',
        errormsg: 'Page Not Found!!!'
    })
    // res.send('404 Not Found')
})

// app.get('' ,(req ,res) => {
//     // res.send('Hello Express')
//     res.send('<h1>Express</h1>')
// })

// app.get('/help' ,(req ,res) => {
//     res.send({
//         name: 'parth',
//         age: 21
//     })
// })

// app.get('/about' ,(req ,res) => {
//     res.send({
//         name: 'parth',
//         age: 21
//     })
// })

// app.get('/weather' ,(req ,res) => {
//     res.send({
//         forecast: 'summer',
//         location: 'surat'
//     })
// })


app.listen(3000 , () => {
    console.log("express is running.")
})