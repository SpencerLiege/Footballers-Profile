// module {start}
const mongoose = require('mongoose')
const { clubs, leagueCountries } = require('./clubs')
const footballers = require('./footballer')
const Players = require('../model/schema')
// module {end}

// mongoose connection {start}
mongoose.connect('mongodb://127.0.0.1/Spencer')
mongoose.set('strictQuery', true)

const db = mongoose.connection
db.on('error', console.error.bind(console, "connection error"))
db.once('open', ()=>{
    console.log("Database connection established")
})
// mongoose connection {end}

const seedDb = async ()=>{
    await Players.deleteMany({})
    for(let i=0; i < footballers.length; i++){
        const player = new Players({
            name: `${footballers[i].name}`,
            country: `${footballers[i].country}`,
            position: `${footballers[i].position}`,
            number: `${footballers[i].number}`,
            photo: `${footballers[i].photo}`
        })
        await player.save()
    }
}


// close mongoose connection
seedDb().then(() => {
    mongoose.connection.close();
})