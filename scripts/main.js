const config = {
  baseUrl: 'http://api.tvmaze.com/search/shows?q=',
  query: 'food'
}





const Listing = {

  computed: Vuex.mapState(['series']),

  template: `
    <div class="series-listing">

      <article class="series-card" v-for="item in series" :key="item.show.id">

        <router-link class="series-card-link" :to="String(item.show.id)">

          <img class="series-card-poster" :src="item.show.image ? item.show.image.medium : 'images/no-image.png'" :alt="item.show.name">

          <header class="series-card-header">

            <h2 class="series-card-title">{{ item.show.name }}</h2>

            <ul class="series-genres">
              <li class="series-genres-item" v-for="genre in item.show.genres">{{ genre }}</li>
            </ul>

          </header>

        </router-link>

      </article>

    </div>
  `

}





const Details = {

  template: `
    <article class="series-details">

      <img class="series-details-poster" :src="selectedSeries.show.image ? selectedSeries.show.image.medium : 'images/no-image.png'" :alt="selectedSeries.show.name">

      <div class="series-details-body">

        <h2 class="series-details-title">{{ selectedSeries.show.name }}</h2>

        <dl v-if="selectedSeries.show.genres.length" class="series-genres">
          <dt class="series-genres-label">Genres:</dt>
          <dd class="series-genres-item" v-for="genre in selectedSeries.show.genres">{{ genre }}</dd>
        </dl>

        <div v-html="selectedSeries.show.summary"></div>

        <p>Premiered on: {{ selectedSeries.show.premiered }}</p>

        <router-link to="/">Go back</router-link>

      </div>

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