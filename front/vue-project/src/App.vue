<template>
  <div>
        <h1> Search </h1>
            Type a name of a city <input type="search" name="search" v-model="search" placeholder="search"> 
            <button @click="search">      GO       </button>

    <ul v-if="posts && posts.length">
      <li v-for="post of posts">
        <p>  The forecast for  {{post.city}}  is {{post.weathercode}}</p>
      </li>
    </ul>

    <ul v-if="errors && errors.length">
      <li v-for="error of errors">
        {{error.message}}
      </li>
    </ul>
  </div>
</template>


<style>
@media (min-width: 1024px) {
  .weather {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      posts: [],
      errors: [],
      search: ""
    }
  },

  // Fetches posts when the component is created.
  async created() {
    try {
      const response = await axios.get(`http://localhost:8083/`).then(res => res.data.test)
.catch(error => console.log(error, 'error'))
      this.posts = response
    } catch (e) {
      this.errors.push(e)
    }
  }
}
</script>