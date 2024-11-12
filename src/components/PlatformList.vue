<template>
  <v-container>
    <v-row>
      <v-col
        v-for="platform in platforms"
        :key="platform.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card @click="selectPlatform(platform)" class="text-center">
          <v-img :src="platform.logo" class="platform-logo" />
          <v-card-title>{{ platform.name }}</v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Platform } from "../types/platform";

export default defineComponent({
  props: {
    platforms: {
      type: Array as () => Platform[],
      required: true,
    },
  },
  methods: {
    selectPlatform(platform: Platform) {
      this.$emit("select", platform);
    },
  },
});
</script>

<style scoped>
.platform-logo {
  width: 250px;
  height: 250px;
  object-fit: contain;
  margin: 0 auto;
}
</style>
