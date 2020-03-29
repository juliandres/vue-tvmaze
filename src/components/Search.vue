<template>
  <div>
    <form @submit.prevent="emitQuery">
      <label for="search-form__input">Search for your favorite show</label>
      <input
        id="search-form__input"
        type="search"
        autocomplete="off"
        v-model="query"
      />
      <button>Search</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: this.getInitialQueryValue()
    };
  },
  watch: {
    $route() {
      this.query = this.getInitialQueryValue()
    }
  },
  methods: {
    getInitialQueryValue() {
      return this.$route.query.search || "";
    },
    emitQuery() {
      this.$emit("submit:query", this.query);
    }
  }
};
</script>
