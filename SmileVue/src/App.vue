<template>
  <div id="app" class="van-hairline--surround">
    <div class="null"></div><router-view/>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  }
};
</script>

<style>
#app{
  background-color: #f0f0f0;
}
.null{
  height: 1rem;
  background-color:#e501ad;
}
</style>
