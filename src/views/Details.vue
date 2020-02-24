<template>
  <article class="series-details">
    <img
      class="series-details-poster"
      :src="
        selectedSeries.show.image
          ? selectedSeries.show.image.medium
          : 'images/no-image.png'
      "
      :alt="selectedSeries.show.name"
    />

    <div class="series-details-body">
      <h2 class="series-details-title">{{ selectedSeries.show.name }}</h2>

      <dl v-if="selectedSeries.show.genres.length" class="series-genres">
        <dt class="series-genres-label">Genres:</dt>
        <dd
          class="series-genres-item"
          v-for="(genre, index) in selectedSeries.show.genres"
          :key="index"
        >
          {{ genre }}
        </dd>
      </dl>

      <div v-html="selectedSeries.show.summary"></div>

      <p>Premiered on: {{ selectedSeries.show.premiered }}</p>

      <router-link to="/">Go back</router-link>
    </div>
  </article>
</template>

<script>
export default {
  data() {
    return {
      selectedSeries: this.$store.state.series.find(
        el => el.show.id === Number(this.$route.params.id)
      )
    }
  },
  watch: {
    $route() {
      this.selectSeries()
    }
  },
  methods: {
    selectSeries() {
      this.selectedSeries = this.$store.state.series.find(
        el => el.show.id === Number(this.$route.params.id)
      )
    }
  }
}
</script>
