<template>
  <div>
    <Search @submit:query="loadData" />
    <div class="series-listing">
      <SearchResult v-for="item in showsData" :item="item" :key="item.show.id" />
    </div>
  </div>
</template>

<script>
import axios from "axios";

import Search from "../components/Search";
import SearchResult from "../components/SearchResult";

export default {
  components: {
    Search,
    SearchResult
  },
  data() {
    return {
      showsData: []
    };
  },
  methods: {
    async loadData(query) {
      try {
        const response = await axios.get(
          `http://api.tvmaze.com/search/shows?q=${query}`
        );
        this.showsData = response.data;
      } catch (err) {
        console.error(err);
      }
    }
  }
};
</script>
