
const db = require('./database');
const cors = require('cors');
const axios = require('axios');
const express = require("express")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const weather = require("./weatherUtils")

let insee =  []  
let insee2 = []
let final = []
// Initialisation de la base avec les deux tables nécessaires (à garder)
db.init();
db.all('select insee, population from city').then((data) => {
  insee.push(data);
})
.then(() => { 
  test()
})


// needed to junction tables in forecast so to have population together

async function test() {
  try {Object.values(insee[0]).forEach(val => insee2.push(val.insee));
  for (const id in insee2) {
    const response = await axios(`https://api.meteo-concept.com/api/forecast/daily?token=1e003f4cdd1c83bb79bd7c22cda54fa65f7b0fcd86bd13a00f3e8c607b5c94c3&insee=${insee2[id]}`);
    final.push({city: response.data.city.name, weathercode: weather.getIconByCode(response.data.forecast[0].weather)});
  }
}
catch (e) {
}
}

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors({
  credentials: true
}))
app.get('/', (req, res) => {
    res.send({
        test: final
    })

})
app.listen(process.env.PORT || 8083)
