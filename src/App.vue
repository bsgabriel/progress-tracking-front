<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, provide } from "vue";
import { useRouter } from "vue-router";
import { NavigationService } from "./services/navigationService";

export default defineComponent({
  name: "App",
  setup() {
    const serivce = new NavigationService(useRouter());
    provide("navigationService", serivce);
  },
});
</script>
