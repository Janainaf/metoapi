<template>
  <div>
        <h1> Search </h1>
            Type a name of a city <input type="search" name="search" v-model="search" placeholder="search"> 
            <button @click="search">      GO       </button>
              </div>
 <div class="row">
  <div class="column">    
  <table id="cities">
     <tr v-if="table && table.length">
    <th>Insee</th>
    <th>City</th>
    <th>Population</th>
  </tr>
    <tr v-for="(row, index) in table" @click="toggleElement(row, index)" >
    <td >{{row.insee}}</td>
    <td>{{row.name}}</td>
    <td>{{row.population}}</td>
     </tr>
     </table>
        </div>
  <div class="column">
  <table id="cities" v-if="weather && weather.length">
  <th>Weather</th>
   <tr v-for="(forecast, ind) in listElementShow" :key="ind"  >
       <td> The forecast for  {{forecast.city}}  is {{forecast.weathercode}} </td> 
     </tr>
 </table>

    </div>
</div> 
    <ul v-if="errors && errors.length">
      <li v-for="error of errors">
        {{error.message}}
      </li>
    </ul>

</template>

<style>
@media (min-width: 1024px) {
  .weather {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

.column {
  float: left;
  width: 50%;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}

#cities {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#cities td, #cities th {
  border: 1px solid #ddd;
  padding: 8px;
}

#cities tr:nth-child(even){background-color: #f2f2f2;}

#cities tr:hover {background-color: #ddd;}

#cities th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: grey;
  color: black;
}

</style>
<script>
import axios from 'axios';

export default {
  methods:{
    toggleElement(row, index) {
      this.weather[index].isShow = !this.weather[index].isShow;
    }
  },

  data() {
    return {
      weather: [],
      table: [],
      forecast: [],
      errors: [],
      search: "",
      hidden: {}
    }
  },
  computed: {
     listElementShow() {
      return this.weather.filter(e => e.isShow); 
    }
        },

  // Fetches posts when the component is created.
  async created() {
    try {
      const response = await axios.get(`http://localhost:8081/`).then(res => res.data.test)
.     catch(error => console.log(error, 'error'))
      this.weather = response
      const table = await axios.get(`http://localhost:8081/`).then(res =>  res.data.table)
.     catch(error => console.log(error, 'error'))
      this.table = table
      const forecast = await axios.get(`http://localhost:8081/`).then(res =>  res.data.forecast)
.     catch(error => console.log(error, 'error'))
      this.forecast = forecast
      console.log(forecast)

    } catch (e) {
      this.errors.push(e)
    }
  }
}
</script>