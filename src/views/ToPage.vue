<template>
  <div>
    <Header title="TO" />
    <PlatformList
      :platforms="platforms"
      @select="goToIntegrationPage" />
  </div>
</template>

<script lang="ts">
import { ref, onMounted, inject } from "vue";
import Header from "../components/Header.vue";
import PlatformList from "../components/PlatformList.vue";
import { Platform } from "../types/platform";
import { usePlatformStore } from "../store/platformStore.ts";
import { NavigationService } from "@/services/navigationService";

export default {
  components: {
    Header,
    PlatformList,
  },
  setup() {
    const platforms = ref([]);
    const navigationService = inject<NavigationService>("navigationService");

    onMounted(async () => {
      const response = await fetch("http://localhost:8080/platform/submission");
      platforms.value = await response.json();
    });

    const goToIntegrationPage = (platform: Platform) => {
      usePlatformStore().setSubmissionPlatform(platform);
      navigationService?.navigateToIntegrationPage();
    };

    return {
      platforms,
      goToIntegrationPage,
    };
  },
};
</script>
