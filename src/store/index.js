import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const config = {
  baseUrl: 'http://api.tvmaze.com/search/shows?q=',
  query: 'food'
}

export default new Vuex.Store({
  state: {
    series: [],
    loading: true,
    errored: false
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
  },
  actions: {
    loadData({ commit }) {
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
  modules: {}
})
