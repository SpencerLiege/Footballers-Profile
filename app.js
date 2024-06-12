// module {start}
const express = require('express')
const path = require('path')
const app = express()
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const Players = require('../project/model/schema')
// const { platform } = require('os')
// const footballers = require('./seeds/footballer')
// module {end}
app.use(methodOverride('_method'))
// mongoose connection {start}
mongoose.connect('mongodb://127.0.0.1/Spencer')
mongoose.set('strictQuery', true)

const db = mongoose.connection
db.on('error', console.error.bind(console, "connection error"))
db.once('open', ()=>{
    console.log("Database connection established")
})
// mongoose connection {end}

// set engine {start}
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
// set engine {end}

// middleware {start}
app.use('/Public', express.static('Public'))
app.use(express.urlencoded({extended: true}))

// middleware {end}

// home page route
app.get('/', (req, res)=>{
    res.render('home')
})

// add player route  {CREATE}
app.get('/players/add', (req, res)=>{
    res.render('render/add')
})

app.post('/players', async (req, res)=>{
    const player = new Players({
        name: req.body.name,
        position: req.body.position,
        country: req.body.country,
        number: req.body.number
    })
    await player.save()
    // res.redirect(`/campgrounds/${campground._id}`)
    res.redirect('/players')
})

// all players route  {READ}
app.get('/players', async (req, res)=>{
    const person = await Players.find({})
    res.render('render/all', { person })
})
// show player
app.get('/players/:id', async (req, res)=>{
    const player = await Players.findById(req.params.id)
    res.render('render/show', { player })
})

// edit player information {UPDATE}
app.get('/players/:id/edit', async (req, res)=>{
    const player = await Players.findById(req.params.id)
    res.render('render/edit', { player })
})

app.put('/players/:id', async (req, res)=>{
    const { id } = req.params;
    const player = await Players.findByIdAndUpdate(id, { ...req.body.campground });
    res.redirect(`/players/${player._id}`)
    
})
// delete player information {DELETE}
app.delete('players/:id', async (req, res)=>{
    const { id } = req.params
    await Players.findByIdAndDelete(id)
    res.redirect('/players')
})




// port listener {start}
app.listen(200, ()=>{
    console.log('Active, listening on PORT 200')
})
// port listener {end}