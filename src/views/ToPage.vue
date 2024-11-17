<template>
  <div>
    <Header title="TO" />
    <PlatformList
      :platforms="platforms"
      @select="goToIntegrationPage"
    />
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from "vue";
import Header from "../components/Header.vue";
import PlatformList from "../components/PlatformList.vue";
import { useRouter } from "vue-router";
import { Platform } from "../types/platform";
import { usePlatformStore } from "../store/platformStore.ts";

export default {
  components: {
    Header,
    PlatformList,
  },
  setup() {
    const router = useRouter();
    const platforms = ref([]);

    onMounted(async () => {
      const response = await fetch("http://localhost:8080/platform/submission");
      platforms.value = await response.json();
    });

    const goToIntegrationPage = (platform: Platform) => {
      usePlatformStore().setSubmissionPlatform(platform);
      router.push({ path: "/integration" });
    };

    return {
      platforms,
      goToIntegrationPage,
    };
  },
};
</script>
