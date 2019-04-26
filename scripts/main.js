const app  = new Vue({

  el: '#app',

  data () {

    return {
      seriesQuery: null
    }

  },

  mounted () {

    axios
      .get('http://api.tvmaze.com/search/shows?q=food')
      .then(response => this.seriesQuery = response.data)

  }

})