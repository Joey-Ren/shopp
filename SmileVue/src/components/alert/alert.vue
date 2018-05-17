<template>
    <div class="alert" transition="modal-scale">
        <div class="alert-mask"></div>
        <div class="alert-content"><div>弹窗内容</div></div>
    </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
@function pxRem($px) {
  @return $px/16+rem;
}

.alert {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 100;
}
.alert-mask {
  background: rgba(0, 0, 0, 0.2);
  filter: progid:DXImageTransform.Microsoft.gradient(
      startColorstr=#33000000,
      endColorstr=#33000000
    );
  width: 100%;
  height: 100%;
}
.alert-content{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
}
.modal-scale-transition{
  transition: transform,opacity .3s ease;
}

.modal-scale-enter,
.modal-scale-leave {
    opacity: 0;
}

.modal-scale-enter {
  transform: scale(1.1);
}
.modal-scale-leave {
  transform: scale(0.8);
}
</style>