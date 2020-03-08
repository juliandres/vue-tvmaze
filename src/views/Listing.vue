<template>
  <div class="series-listing">
    <article class="series-card" v-for="item in showsData" :key="item.show.id">
      <router-link class="series-card-link" :to="showUrl(item)">
        <img
          class="series-card-poster"
          :src="
            item.show.image ? item.show.image.medium : 'images/no-image.png'
          "
          :alt="item.show.name"
        />

        <header class="series-card-header">
          <h2 class="series-card-title">{{ item.show.name }}</h2>

          <ul class="series-genres">
            <li
              class="series-genres-item"
              v-for="(genre, index) in item.show.genres"
              :key="index"
            >
              {{ genre }}
            </li>
          </ul>
        </header>
      </router-link>
    </article>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      showsData: [],
      query: "food"
    };
  },
  methods: {
    async loadData() {
      try {
        const response = await axios.get(
          "http://api.tvmaze.com/search/shows?q=" + this.query
        );
        this.showsData = response.data;
      } catch (err) {
        console.error(err);
      }
    },
    showUrl(item) {
      return `/show/${item.show.id}`;
    }
  },
  created() {
    this.loadData();
  }
};
</script>
