<template>
  <div>
    <Header title="FROM" />
    <PlatformList
      :platforms="platforms"
      @select="gotToSubmissionPlatformSelection"
    />
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from "vue";
import Header from "../components/Header.vue";
import PlatformList from "../components/PlatformList.vue";
import { platformStore } from "../store/platformStore.ts";
import { useRouter } from "vue-router";
import { Platform } from "../types/platform";

export default {
  components: {
    Header,
    PlatformList,
  },
  setup() {
    const router = useRouter();
    const platforms = ref([]);

    onMounted(async () => {
      const response = await fetch("http://localhost:8080/platform/search");
      console.log("search options", response);
      platforms.value = await response.json();
    });

    const gotToSubmissionPlatformSelection = (platform: Platform) => {
      platformStore().setSearchPlatform(platform);
      router.push({ path: "/to" });
    };

    return {
      platforms,
      gotToSubmissionPlatformSelection,
    };
  },
};
</script>
