<template>
  <div>
    <Search @submit:query="fetchData" />
    <div v-if="$route.query.search" class="series-listing">
      <SearchResult
        v-for="item in showsData"
        :item="item"
        :key="item.show.id"
      />
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
  created() {
    this.fetchDataFromQuery();
  },
  watch: {
    $route() {
      this.fetchDataFromQuery();
    }
  },
  methods: {
    async fetchData(showsQuery) {
      try {
        const response = await axios.get(
          `http://api.tvmaze.com/search/shows?q=${showsQuery}`
        );
        this.setUrlQuery(showsQuery);
        this.showsData = response.data;
      } catch (err) {
        console.error(err.message);
      }
    },
    setUrlQuery(searchQuery) {
      if (this.$route.query.search !== searchQuery) {
        this.$router.push({
          name: "Home",
          query: {
            search: searchQuery
          }
        });
      }
    },
    fetchDataFromQuery() {
      const search = this.$route.query.search;
      if (search && search !== "") {
        this.fetchData(search);
      }
    }
  }
};
</script>
