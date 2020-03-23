<template>
  <article class="series-details">
    <img
      class="series-details-poster"
      :src="showData.image ? showData.image.medium : 'images/no-image.png'"
      :alt="showData.name"
    />

    <div class="series-details-body">
      <h2 class="series-details-title">{{ showData.name }}</h2>

      <button v-if="!isFavorite" type="button" @click="toggleFavorite">
        Add to favorites
      </button>
      <button v-if="isFavorite" type="button" @click="toggleFavorite">
        Remove from favorites
      </button>

      <dl
        v-if="showData.genres && showData.genres.length"
        class="series-genres"
      >
        <dt class="series-genres-label">Genres:</dt>
        <dd
          class="series-genres-item"
          v-for="(genre, index) in showData.genres"
          :key="index"
        >
          {{ genre }}
        </dd>
      </dl>

      <div v-html="showData.summary"></div>

      <p>Premiered on: {{ showData.premiered }}</p>

      <button @click="$router.go(-1)">Go back</button>
    </div>
  </article>
</template>

<script>
import axios from "axios";

const favoriteShows = {};

export default {
  name: "Details",
  data() {
    return {
      showData: {},
      isFavorite: !!favoriteShows[this.$route.params.id]
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
    },
    toggleFavorite() {
      this.$set(
        favoriteShows,
        this.$route.params.id,
        !favoriteShows[this.$route.params.id]
      );
      this.isFavorite = !this.isFavorite;
    }
  },
  created() {
    this.fetchShow();
  }
};
</script>
