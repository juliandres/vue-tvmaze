<template>
  <article class="series-card">
    <router-link class="series-card-link" :to="showUrl">
      <img class="series-card-poster" :src="showImage" :alt="item.show.name" />

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
</template>

<script>
export default {
  props: {
    item: {
      type: Object
    }
  },
  computed: {
    showUrl() {
      return `/show/${this.item.show.id}`;
    },
    showImage() {
      return this.item.show.image
        ? this.item.show.image.medium
        : "images/no-image.png";
    }
  }
};
</script>
