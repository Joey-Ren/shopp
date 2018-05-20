<template>
  <div id="app" class="van-hairline--surround">
    <load v-show="getIsLoading"></load>
    <router-view v-show="!getIsLoading"/>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "App",
  data() {
    return {};
  },
  computed: { ...mapGetters(["getIsLoading"]) },
  methods: {

  }
};
</script>

<style>
#app {
  background-color: #f0f0f0;
}
</style>
