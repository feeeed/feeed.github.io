<script setup lang="ts">

 const props = defineProps(['items'])



</script>

<template>
  <div class="shop-container">
    <div class="item" v-for="(item) in props.items">
      <img :src="item.imageURL" width="100%" alt="item" />
      <h3>{{ item.title }}</h3>

    </div>


  </div>
</template>

<style lang="scss" scoped>
.shop-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  border: 1px solid black;
  border-radius: 10px;
  width: 350px;
  .item{
    display: flex;
    flex-direction: column;
    align-items: center;

  }

}

</style>