const config = {
  baseUrl: 'http://api.tvmaze.com/search/shows?q=',
  query: 'food'
}





const Listing = {

  computed: Vuex.mapState(['series']),

  template: `
    <div>

      <article v-for="item in series" :key="item.show.id">

        <router-link :to="String(item.show.id)">

          <h2>{{ item.show.name }}</h2>

          <ul>
            <li v-for="genre in item.show.genres">{{ genre }}</li>
          </ul>

          <img v-if="item.show.image" :src="item.show.image.medium" :alt="item.show.name">

        </router-link>

      </article>

    </div>
  `

}





const Details = {

  template: `
    <article>

      <img v-if="selectedSeries.show.image" :src="selectedSeries.show.image.medium" :alt="selectedSeries.show.name">

      <h2>{{ selectedSeries.show.name }}</h2>

      <ul>
        <li v-for="genre in selectedSeries.show.genres">{{ genre }}</li>
      </ul>

      <div v-html="selectedSeries.show.summary"></div>

      <p>{{ selectedSeries.show.premiered }}</p>

      <router-link to="/">Go back</router-link>

    </article>
  `,

  data () {

    return {
      selectedSeries: this.$store.state.series.find(el => el.show.id === Number(this.$route.params.id))
    }

  },

  watch: {

    $route () {
      this.selectSeries()
    }

  },

  methods: {

    selectSeries () {
      this.selectedSeries = this.$store.state.series.find(el => el.show.id === Number(this.$route.params.id))
    }

  }

}





const routes = [
  { path: '/', component: Listing },
  { path: '/:id', component: Details }
]





const router = new VueRouter({
  routes
})





const store = new Vuex.Store({

  state: {
    series: [],
    loading: true,
    errored: false
  },

  actions: {
    loadData({commit}) {
      axios
        .get(config.baseUrl + config.query)
        .then(response => {
          commit('updateSeries', response.data)
          commit('changeLoadingState', false)
        })
        .catch(error => {
          console.log(error)
          commit('changeErrorState', true)
        })
    }
  },

  mutations: {
    updateSeries(state, series) {
      state.series = series
    },
    changeLoadingState(state, loading) {
      state.loading = loading
    },
    changeErrorState(state, errored) {
      state.errored = errored
    }
  }

})





const app = new Vue({

  el: '#app',

  computed: Vuex.mapState(['loading', 'errored']),

  router,

  store,

  mounted () {
    this.$store.dispatch('loadData')
  }

})