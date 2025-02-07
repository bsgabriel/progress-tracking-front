<template>
  <div>
    <Header title="FROM" />
    <PlatformList
      :platforms="platforms"
      @select="gotToSubmissionPlatformSelection" />
  </div>
</template>

<script lang="ts">
import { ref, onMounted, inject } from "vue";
import Header from "../components/Header.vue";
import PlatformList from "../components/PlatformList.vue";
import { usePlatformStore } from "../store/platformStore.ts";
import { Platform } from "../types/platform";
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
      const response = await fetch("http://localhost:8080/platform/search");
      platforms.value = await response.json();
    });

    const gotToSubmissionPlatformSelection = (platform: Platform) => {
      usePlatformStore().setSearchPlatform(platform);
      navigationService?.goToSubmissionPlatformSelection();
    };

    return {
      platforms,
      gotToSubmissionPlatformSelection,
    };
  },
};
</script>
