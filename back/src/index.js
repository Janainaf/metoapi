
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
// let tests = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
// Initialisation de la base avec les deux tables nécessaires (à garder)
db.init();
db.all('select insee, population from city').then((data) => {
  insee.push(data);
})
.then(() => { 
   test()
})

async function test() {
  try {Object.values(insee[0]).forEach(val => insee2.push(val.insee));
  for (const id in insee2) {
    const response = await axios(`https://api.meteo-concept.com/api/forecast/daily?token=1e003f4cdd1c83bb79bd7c22cda54fa65f7b0fcd86bd13a00f3e8c607b5c94c3&insee=${insee2[id]}`);
    final.push({city: response.data.city.name, weathercode: weather.getIconByCode(response.data.forecast[0].weather)});
    try  {
    // db.run(`insert into forecast (date, insee, details) VALUES \
    // ("${response.data.forecast[0].datetime}", ${insee2[id]}, "${response.data.forecast[0].weather}")
    // `) 
    // ***** Select and convert to varchar?
}
catch (e) {
  console.log(e)
}
    db.all('select * from forecast').then((rows) => {
      console.table(rows);
    });
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
  db.all('select insee, name, population from city').then((rows, err) =>{
    if(!err){
      db.all('select * from forecast').then((rowsForecast, errForecast)=>{
            if(!errForecast){
                res.send({
                  test: final,
                  table: rows,
                  forecast: rowsForecast, 
               });
            }
        }); 
  
    }
    else console.log(err);
  });

  // wo queries in one call to 

// db.all('select insee, name, population from city').then((rows) => {
//   const forecast =   db.all('select * from forecast').then((rows) => {
//     return rows})
//   return res.send({
//     test: final,
//     table: rows,
//     forecast: forecast, d
// })
// });
})


app.listen(process.env.PORT || 8081)
