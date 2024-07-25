<template>
  <div class="card-container">
    <b-card v-for="platform in platforms" :key="platform.name" @click="handleClick(platform)" class="option-card" tag="article" style="max-width: 20rem">
      <b-card-img :src="platform.logo" alt="Image" class="card-img-top" />
      <b-card-title class="text-center">{{ platform.name }}</b-card-title>
    </b-card>
  </div>
</template>

<script>
import { BCard, BCardImg, BCardTitle } from "bootstrap-vue-next";

export default {
  components: {
    BCard,
    BCardImg,
    BCardTitle,
  },
  props: {
    platforms: {
      type: Array,
      required: true,
    },
  },
  methods: {
    handleClick(platform) {
      this.$emit("card-clicked", platform);
    },
  },
};
</script>

<style scoped>
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
}

.option-card {
  transition: transform 0.3s;
  cursor: pointer;
}

.option-card:hover {
  transform: scale(1.1);
}

.card-img-top {
  width: 10rem;
  height: 10rem;
  object-fit: contain;
}
</style>
