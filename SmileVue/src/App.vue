<template>
  <div id="app" class="van-hairline--surround">
   <load></load>
    <router-view/>
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

</style>
