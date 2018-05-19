<template>
    <div class="loading" id="loading">
        <div class="load">
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
@function pxRem($px) {
  @return $px/16 + rem;
}
.loading {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
}

.load {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
}

.load i {
  display: inline-block;
  width: pxRem(20);
  height: pxRem(100);
  background-color: blue;
  margin-left: pxRem(13);
  transform: scaleY(0.4);
  animation: loading 1s infinite;
}

@keyframes loading {
  0%,
  100% {
    transform: scaleY(0.4);
  }

  50% {
    transform: scaleY(1);
  }
}

.load i:nth-child(2) {
  animation-delay: 0.1s;
}

.load i:nth-child(3) {
  animation-delay: 0.3s;
}

.load i:nth-child(4) {
  animation-delay: 0.5s;
}

.load i:nth-child(5) {
  animation-delay: 0.7s;
}
</style>