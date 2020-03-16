<template>
  <article class="series-details">
    <img
      class="series-details-poster"
      :src="showData.image ? showData.image.medium : 'images/no-image.png'"
      :alt="showData.name"
    />

    <div class="series-details-body">
      <h2 class="series-details-title">{{ showData.name }}</h2>

      <dl v-if="showData.genres && showData.genres.length" class="series-genres">
        <dt class="series-genres-label">Genres:</dt>
        <dd
          class="series-genres-item"
          v-for="(genre, index) in showData.genres"
          :key="index"
        >{{ genre }}</dd>
      </dl>

      <div v-html="showData.summary"></div>

      <p>Premiered on: {{ showData.premiered }}</p>

      <router-link to="/">Go back</router-link>
    </div>
  </article>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      showData: {}
    };
  },
  methods: {
    async fetchShow() {
      try {
        const response = await axios.get(
          `http://api.tvmaze.com/shows/${this.$route.params.id}`
        );
        this.showData = response.data;
      } catch (err) {
        console.error(err);
      }
    }
  },
  created() {
    this.fetchShow();
  }
};
</script>
