<template>
  <div class="series-listing">
    <article class="series-card" v-for="item in series" :key="item.show.id">
      <router-link class="series-card-link" :to="String(item.show.id)">
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
import { mapState } from 'vuex'

export default {
  computed: mapState(['series'])
}
</script>
